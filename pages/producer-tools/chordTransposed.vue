<script setup lang="ts">
/**
 * 增加一个点击箭头的声音
 *
 *
 */
import Note from "~/services/note";
import Chord, {ChordExtension, ChordType} from "~/services/chord";
import {range} from "~/utils/math";
import PianoPlayer, {ChordPlayMode, Timber} from "~/services/pianoPlayer";

const scaleNoteBefore = ref<string>('C');
const scaleNoteAfter = ref<string>('D');

/**
 * 试听和弦是否增加低音
 */
const isAddBass = ref<boolean>(false);
/**
 * 当前是否是正在加载音源的阶段
 */
const isLoading = ref<boolean>(true);

const chordPlayMode = ref<ChordPlayMode>(ChordPlayMode.Columnar);

onMounted(async () => {
  await PianoPlayer.loadAudio(Timber.defaultTimber);
  isLoading.value = false;
});

// 基础的和弦格子样式
const baseClass = 'm-1 w-16 p-1 normalChord rounded hover:scale-105 transition active:scale-95';
// 转调前和弦样式
// const beforeClass = 'bg-green-light';
const beforeClass = 'bg-green-700';
// 转调厚和弦样式
const afterClass = 'bg-red-700';
// 公用和弦
const joinClass = 'bg-yellow-700';

/**
 * 绑定不同的点击和弦按钮
 * @param number
 * @param chordType
 * @param chordExtension
 */
function handleClickChordByArgs(number: number, chordType: ChordType, chordExtension: ChordExtension) {
  while (number > 12) {
    number -= 12;
  }
  PianoPlayer.playChord(
      new Chord(
          new Note(2, number),
          chordType,
          chordExtension
      ),
      true,
      chordPlayMode.value,
  );
  if (isAddBass.value) {
    PianoPlayer.playNote(
        new Note(
            0,
            number
        )
    )
  }
}

/**
 * 使用缓存加速判断，防止用户过快切换
 */
const cachedResults: Record<string, boolean> = {};

/**
 * 判断当前这个和弦是否在调内
 */
function isCurChordInScale(i: number, enumNumberString: string): boolean {
  const key = `isCurChordInScale-${enumNumberString}-${i}`;
  if (cachedResults[key]) {
    return cachedResults[key];
  }
  const res = (
      new Chord(new Note(3, i), parseInt(enumNumberString), ChordExtension.None)
  ).getScale().includes(scaleNoteBefore.value);
  // cachedResults[key] = res;
  return res;
}

/**
 * 判断下一个调的和弦是否在调内
 * @param i
 * @param enumNumberString
 */
function isNextChordInScale(i: number, enumNumberString: string): boolean {
  const key = `isNextChordInScale-${enumNumberString}-${i}`;
  if (cachedResults[key]) {
    return cachedResults[key];
  }
  const res = (
      new Chord(new Note(3, i), parseInt(enumNumberString), ChordExtension.None)
  ).getScale().includes(scaleNoteAfter.value)
  // cachedResults[key] = res;
  return res;
}

function getChordClass(i: number, enumNumberString: string): Record<string, boolean> {
  const before = isCurChordInScale(i, enumNumberString);
  const after = isNextChordInScale(i, enumNumberString);
  if (before && after) {
    return {
      [baseClass]: true,
      [joinClass]: true,
    }
  }
  return {
    [baseClass]: true,
    [beforeClass]: before,
    [afterClass]: after,
  }
}

/**
 * 渲染和弦名称
 * @param i
 * @param enumNumberString
 */
function renderNoteName(i: number, enumNumberString: string): string {
  return new Note(3, i).getNoteNameFix() + ChordType[parseInt(enumNumberString)];
}
</script>

<template>
  <div class="p-4">
    <template v-if="isLoading">
      <div class="h-screen flex justify-center items-center">
        <h1>音源加载中...</h1>
      </div>
    </template>
    <h1 class="text-3xl text-center">转调和弦</h1>
    <h2 class="text-center">不同调之间的共用三和弦直观查看</h2>
    <div>
      <span>样式说明：</span>
      <button :class="{[baseClass]: true, [beforeClass]: true}">{{ scaleNoteBefore }}大调和弦</button>
      <button :class="{[joinClass]: true, [baseClass]: true}">公共调和弦</button>
      <button :class="{[afterClass]: true, [baseClass]: true}">{{ scaleNoteAfter }}大调和弦</button>
      <button :class="{[baseClass]: true}">离调和弦</button>
    </div>
    <div class="leading-loose">
      <div>
        <span>转调前：高亮</span>
        <select class="outline outline-allogenes-dark mx-2 rounded" v-model="scaleNoteBefore">
          <option
              :value="name" v-for="name in Note.SCALE_LIST" :key="name">{{ name }}
          </option>
        </select>
        <span>大调</span>
      </div>

      <div>
        <span>转调后：高亮</span>
        <select class="outline outline-allogenes-dark mx-2 rounded" v-model="scaleNoteAfter">
          <option
              :value="name" v-for="name in Note.SCALE_LIST" :key="name">{{ name }}
          </option>
        </select>
        <span>大调</span>
      </div>
      <div>
        <span>和弦播放模式</span>
        <select class="outline outline-allogenes-dark mx-2 rounded" v-model="chordPlayMode">
          <option :value="ChordPlayMode.Columnar">柱式和弦</option>
          <option :value="ChordPlayMode.arpeggio">琶音</option>
          <option :value="ChordPlayMode.rootFifthRootThree">根五根三</option>
          <option :value="ChordPlayMode.rootThreeFifthThree">1232</option>
          <option :value="ChordPlayMode.LargeColumnar">中音上翻</option>
        </select>
      </div>
      <div>
        <span>播放时，增加低音</span>
        <input type="checkbox" v-model="isAddBass">
      </div>

    </div>
    <template v-for="(enumNumberString) in Object.keys(ChordType)" :key="`compare-${enumNumberString}`">
      <div v-if="typeof ChordType[enumNumberString] === 'string'" class="flex">

        <h3 class="w-16 h-16">{{ ChordType[enumNumberString] }}</h3>
        <!-- 遍历所有12音 -->
        <template v-for="i in range(1, 13)" :key="`${enumNumberString}-${i}`">
          <button
              :class="getChordClass(i, enumNumberString)"
              @mousedown="handleClickChordByArgs(i, parseInt(enumNumberString), ChordExtension.None)">
            {{ renderNoteName(i, enumNumberString) }}
          </button>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">

</style>