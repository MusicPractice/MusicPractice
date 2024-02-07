<template>
  <div class="listeningExercise p-6 leading-loose">
    <h2 class="text-xl">随机频率测试</h2>
    <p>
      请打开声音，点击随机一个频率时，系统会生成一个随机频率的声音，范围在20~4000Hz内，然后点播放，播放完了之后再猜测，将你猜的是否准确</p>

    <mp-button @click="handleRandom">随机一个频率</mp-button>
    <mp-button class="" @click="handlePlay">再次播放</mp-button>
    <template v-if="!isValid" >
      <input type="number" placeholder="请输入整数" v-model.lazy="guessValue" :key="guessValue">
      <span>Hz</span>
    </template>
    <mp-button v-if="!isValid" @click="handleGuess">猜！</mp-button>

    <h3 class="text-lg">作答历史</h3>
    <table>
      <thead>
      <tr>
        <td>次数</td>
        <td>答案</td>
        <td>猜测</td>
        <td>差距</td>
        <td>结果</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, i) in guessHistory" :key="i">
        <td>{{ i + 1 }}</td>
        <td>答案：{{ item.answer }}Hz</td>
        <td>猜测：{{ item.guess }}Hz</td>
        <td>差距：{{ Math.abs(item.answer - item.guess) }}Hz</td>
        <td class="text-center"
            :class="item.result ? 'bg-green-800 text-green-50' : 'bg-red-800 text-red-50'">
          {{ item.result ? '正确' : '错误' }}
        </td>
      </tr>
      </tbody>
    </table>
    <mp-button @click="clearHistory">清空历史</mp-button>
  </div>
</template>

<script setup lang="ts">

import MpButton from "~/components/common/mp-button.vue";
import RandomFrequent from "~/services/randomFrequent";
import {ref} from "vue";

let guessValue = ref('');
let isValid = ref(false);
const guessHistory = ref(RandomFrequent.history);

/**
 * 随机抽一个音
 */
function handleRandom() {
  guessValue.value = '';
  RandomFrequent.update();
  isValid.value = RandomFrequent.isValid;
  RandomFrequent.playSound();
}

function handlePlay() {
  RandomFrequent.playSound();
}

function clearHistory() {
  RandomFrequent.clearHistory();
  guessHistory.value = [...RandomFrequent.history];
}

// 处理猜测按钮点击事件
function handleGuess() {
  if (guessValue.value === '') {
    alert('输入不能为空');
    return;
  }
  const guessFreq = parseInt(guessValue.value, 10);

  if (isNaN(guessFreq)) {
    // 如果用户输入的不是有效的数字，则给出错误提示
    alert('请输入有效的频率值！');
  } else {
    const res = RandomFrequent.valid(guessFreq);
    isValid.value = RandomFrequent.isValid;
    guessHistory.value = [...RandomFrequent.history];
    if (res) {
      alert('恭喜你，猜对了！');
    } else {
      alert(`很遗憾，猜错了！答案是${RandomFrequent.freq}`);
    }
  }
}


</script>

<style scoped lang="scss">

</style>
