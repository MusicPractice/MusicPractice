<template>
  <div class="Chord">
    <template v-if="isLoading">
      <div class="h-screen flex justify-center items-center">
        <h1>音源加载中...</h1>
      </div>
    </template>
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
      <span>当前选择的和弦根音：</span>
      <select v-model="currentScaleNote">
        <option v-for="i in range(0, 12)" :key="`root-${i}`">
          {{ Note.SCALE_LIST[i] }}
        </option>
      </select>
    </div>
    <!--遍历所有附加音种类-->
    <template v-for="enumNumberString in Object.keys(ChordExtension)" :key="`${enumNumberString}`">
      <div v-if="typeof ChordExtension[parseInt(enumNumberString)] === 'string'" class="flex">
        <h3 class="w-16 h-16">{{ ChordExtension[parseInt(enumNumberString)] }}</h3>
        <!-- 遍历所有12音 -->
        <span class="flex" v-for="chordTypeStr in Object.keys(ChordType)" :key="`${chordTypeStr}`">
          <mp-button
            v-if="typeof ChordType[chordTypeStr] === 'string'"
            class="m-1 w-32"
            @mousedown="handleClickChordByArgs(currentScaleNote, parseInt(chordTypeStr), parseInt(enumNumberString))">
            {{ ChordType[chordTypeStr] + '/' + ChordExtension[parseInt(enumNumberString)] }}
          </mp-button>
        </span>
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
import { range } from '~/utils/math';
import Note from '~/services/note';
import Chord, { ChordExtension, ChordType } from '~/services/chord';
import PianoPlayer, { ChordPlayMode, Timber } from '~/services/pianoPlayer';
import MpButton from '~/components/common/mp-button.vue';

/**
 * 当前是否是正在加载音源的阶段
 */
const isLoading = ref<boolean>(true);

onMounted(async () => {
  await PianoPlayer.loadAudio(Timber.defaultTimber);
  isLoading.value = false;
});

/**
 * 当前选择的音阶音符
 */
const currentScaleNote = ref<string>('C');


/**
 * 试听和弦是否增加低音
 */
const isAddBass = ref<boolean>(true);


/**
 * 绑定不同的点击和弦按钮
 * @param chordNote
 * @param chordType
 * @param chordExtension
 */
function handleClickChordByArgs(chordNote: string, chordType: ChordType, chordExtension: ChordExtension) {
  PianoPlayer.playChord(
    new Chord(
      Note.fromNoteName(`${chordNote}3`),
      chordType,
      chordExtension,
    ),
    true,
    ChordPlayMode.Columnar,
  );
  if (isAddBass.value) {
    PianoPlayer.playNote(
      Note.fromNoteName(`${chordNote}1`),
    );
  }
}


function login() {
  window.location.href = 'https://github.com/login/oauth/authorize?client_id=7122f296ba2602fb0ff1';
}

function exit() {
  localStorage.removeItem('token');
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
