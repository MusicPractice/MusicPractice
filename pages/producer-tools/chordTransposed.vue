<script setup lang="ts">

import Note from "~/services/note";
import Chord, {ChordExtension, ChordType} from "~/services/chord";
import {range} from "~/utils/math";
import PianoPlayer from "~/services/pianoPlayer";

const scaleNoteBefore = ref<string>('C');
const scaleNoteAfter = ref<string>('D');

/**
 * 试听和弦是否增加低音
 */
const isAddBass = ref<boolean>(false);


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
          new Note(3, number),
          chordType,
          chordExtension
      ),
      true,
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
 * 判断当前这个和弦是否在调内
 */
function isCurChordInScale(i: number, enumNumberString: string): boolean {
  return (
      new Chord(new Note(3, i), parseInt(enumNumberString), ChordExtension.None)
  ).getScale().includes(scaleNoteBefore.value)
}

/**
 * 判断下一个调的和弦是否在调内
 * @param i
 * @param enumNumberString
 */
function isNextChordInScale(i: number, enumNumberString: string): boolean {
  return (
      new Chord(new Note(3, i), parseInt(enumNumberString), ChordExtension.None)
  ).getScale().includes(scaleNoteAfter.value)
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
    <h1>转调和弦</h1>
    <h1>不同调之间的共用三和弦直观查看</h1>
    <div>
      <span>高亮</span>
      <select v-model="scaleNoteBefore">
        <option
            :value="name" v-for="name in Note.SCALE_LIST" :key="name">{{ name }}
        </option>
      </select>
      <span>大调和弦</span>

      <span>高亮</span>
      <select v-model="scaleNoteAfter">
        <option
            :value="name" v-for="name in Note.SCALE_LIST" :key="name">{{ name }}
        </option>
      </select>
      <span>大调和弦</span>

      <span>增加低音</span>
      <input type="checkbox" v-model="isAddBass">
    </div>
    <template v-for="(enumNumberString) in Object.keys(ChordType)" :key="`compare-${enumNumberString}`">
      <div v-if="typeof ChordType[enumNumberString] === 'string'" class="flex">

        <h3 class="w-16 h-16">{{ ChordType[enumNumberString] }}</h3>
        <!-- 遍历所有12音 -->
        <template v-for="i in range(1, 13)" :key="`${enumNumberString}-${i}`">
          <button
              :class="{
                  'ring': isCurChordInScale(i, enumNumberString),
                  'bg-allogenes-dark': isNextChordInScale(i, enumNumberString),
                }"
              class="m-1 w-16 ring-allogenes-deep normalChord rounded hover:scale-105 transition active:scale-95"
              @click="handleClickChordByArgs(i, parseInt(enumNumberString), ChordExtension.None)">
            {{ renderNoteName(i, enumNumberString) }}
          </button>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">

</style>