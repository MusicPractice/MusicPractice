<template>
  <div class="Chord">
    <p>请先点击加载音源，然后再点播放才能试听</p>
    <button class="ring p-2 m-2 rounded" @click="handleClickLoad">加载音源</button>
    <h1>和弦表</h1>
    <table>
      <thead>
      <tr>
        <th></th>
        <th>Maj</th>
        <th>Min</th>
        <th>Dim</th>
        <th>Aug</th>
        <th>Sus2</th>
        <th>Sus4</th>
        <th>5</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>--</td>
        <td>开心/终止</td>
        <td>伤心/暗淡</td>
        <td>紧张</td>
        <td>惊悚/悬疑</td>
        <td>悠闲/甜蜜</td>
        <td>深情/飞扬/终止前</td>
        <td>禅意</td>
      </tr>
      <tr>
        <td>6</td>
        <td>梅花感</td>
        <td>害怕</td>
        <td>更紧张</td>
        <td>-</td>
        <td>增添丝力量</td>
        <td>抑制飞扬增加沉稳</td>
        <td>明亮感</td>
      </tr>
      <tr>
        <td>7</td>
        <td>紧绷感</td>
        <td>淡化伤心</td>
        <td>空灵紧张</td>
        <td>流行感悬疑</td>
        <td>略紧张害怕</td>
        <td>减缓飞扬增加明亮</td>
        <td>不协和</td>
      </tr>
      <tr>
        <td>Maj7</td>
        <td>空灵感</td>
        <td>焦虑</td>
        <td>-</td>
        <td>终止感悬疑</td>
        <td>深情饱满甜蜜</td>
        <td>更沉稳的终止前</td>
        <td>空灵感</td>
      </tr>
      <tr>
        <td>add9</td>
        <td>华语流行感</td>
        <td>梦幻悲伤</td>
        <td>极其惊吓</td>
        <td>悬疑</td>
        <td>温馨安逸感</td>
        <td>增加一点流行感</td>
        <td>禅意流</td>
      </tr>
      <tr>
        <td>9</td>
        <td>焦虑感</td>
        <td>缓解悲伤</td>
        <td>非常害怕</td>
        <td>悬疑</td>
        <td>小紧张悲伤</td>
        <td>更加亮耳</td>
        <td>撞音明亮</td>
      </tr>
      <tr>
        <td>11</td>
        <td>冷酷感</td>
        <td @click="login">看开了</td>
        <td>有点害怕</td>
        <td>悬疑</td>
        <td>小励志/终止感</td>
        <td>更加饱满</td>
        <td>撞音明亮</td>
      </tr>
      <tr>
        <td>13</td>
        <td>惊悚感</td>
        <td @click="exit">不安</td>
        <td>比较害怕</td>
        <td>撞音悬疑</td>
        <td>涟漪感离别</td>
        <td>更加涟漪感</td>
        <td>幽怨感</td>
      </tr>
      </tbody>
    </table>

    <h1>和弦试听</h1>
    <div>
      <span>和弦根音</span>
      <select>
        <option v-for="i in range(0, 12)" :key="`root-${i}`">
          {{ Note.SCALE_LIST[i] }}
        </option>
      </select>
    </div>
    <!--遍历所有附加音种类-->
    <template v-for="(enumNumberString) in Object.keys(ChordExtension)" :key="`${enumNumberString}`">
      <div v-if="typeof ChordExtension[enumNumberString] === 'string'" class="flex">

        <h3 class="w-16 h-16">{{ ChordExtension[enumNumberString] }}</h3>
        <!-- 遍历所有12音 -->
        <span class="flex" v-for="chordTypeStr in Object.keys(ChordType)" :key="`${chordTypeStr}`">
          <button
              v-if="typeof ChordType[chordTypeStr] === 'string'"
              class="m-1 w-32 ring rounded hover:scale-105 transition active:scale-95"
              @click="handleClickChordByArgs(1, parseInt(chordTypeStr), parseInt(enumNumberString))">
            {{ ChordType[chordTypeStr] + '/' + ChordExtension[enumNumberString] }}
          </button>
        </span>
      </div>
    </template>

    <h1>三和弦试听</h1>

    <div>
      <span>高亮</span>
      <select v-model="currentScaleNote">
        <option
            :value="name" v-for="name in Note.SCALE_LIST" :key="name">{{ name }}
        </option>
      </select>
      <span>大调和弦</span>

      <span>增加低音</span>
      <input type="checkbox" v-model="isAddBass">
    </div>
    <!-- 遍历所有和弦类型 -->
    <template v-for="(enumNumberString) in Object.keys(ChordType)" :key="`${enumNumberString}`">
      <div v-if="typeof ChordType[enumNumberString] === 'string'" class="flex">

        <h3 class="w-16 h-16">{{ ChordType[enumNumberString] }}</h3>
        <!-- 遍历所有12音 -->
        <template v-for="i in range(1, 13)" :key="`${enumNumberString}-${i}`">
          <button
              :class="{
                  'outline': isCurChordInScale(i, enumNumberString)
                }"
              class="m-1 w-16 rounded hover:scale-105 transition active:scale-95"
              @click="handleClickChordByArgs(i, parseInt(enumNumberString), ChordExtension.None)">
            {{ renderNoteName(i, enumNumberString) }}
          </button>
        </template>
      </div>
    </template>


  </div>
</template>

<script setup lang="ts">
import {range} from "~/utils/math";
import Note from "~/services/note";
import Chord, {ChordExtension, ChordType} from "~/services/chord";
import PianoPlayer, {Timber} from "~/services/pianoPlayer";

/**
 * 当前选择的音阶音符
 */
const currentScaleNote = ref<string>('C');

/**
 * 判断当前这个和弦是否在调内
 */
function isCurChordInScale(i: number, enumNumberString: string): boolean {
  return (
      new Chord(new Note(3, i), parseInt(enumNumberString), ChordExtension.None)
  ).getScale().includes(currentScaleNote.value)
}

/**
 * 渲染和弦名称
 * @param i
 * @param enumNumberString
 */
function renderNoteName(i: number, enumNumberString: string): string {
  return new Note(3, i).getNoteNameFix() + ChordType[parseInt(enumNumberString)];
}

/**
 * 试听和弦是否增加低音
 */
const isAddBass = ref<boolean>(false);

async function handleClickLoad() {
  await PianoPlayer.loadAudio(Timber.defaultTimber);
  alert('加载完毕');
}

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


function login() {
  window.location.href = "https://github.com/login/oauth/authorize?client_id=7122f296ba2602fb0ff1";
}

function exit() {
  localStorage.removeItem("token");
  window.location.reload();
}
</script>

<style lang="scss">
.Chord {
  overflow: auto;
  padding: 20px 50px 200px;

  h1 {
    text-align: center;
    font-size: 30px;
  }

  h2 {
    font-size: 25px;
    line-height: 2em;
  }

  li {
    line-height: 2em;
  }
}
</style>
