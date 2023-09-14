<template>
  <div class="listeningExercise">
    <h1>听力练习</h1>
    <h2>随机频率测试</h2>
    <button @click="handleRandom">随机一个频率</button>
    <button @click="handlePlay">点击发声</button>
    <input type="number" v-model="guessValue">hz
    <button @click="handleGuess">猜！</button>
  </div>
</template>

<script setup lang="ts">

// 创建 AudioContext 对象
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency: number, duration: number): void {
  // 创建 OscillatorNode
  const oscillator = audioContext.createOscillator();

  // 设置频率
  oscillator.frequency.value = frequency;

  // 将 OscillatorNode 连接到音频目标
  oscillator.connect(audioContext.destination);

  // 开始播放
  oscillator.start(audioContext.currentTime);

  // 停止播放
  oscillator.stop(audioContext.currentTime + duration);
}

let randomFreq = Math.floor(80 + Math.random() * 1000);
let guessValue = '';
/**
 * 随机抽一个音
 */
function handleRandom() {
  // 80 ~ 1080
  randomFreq = Math.floor(80 + Math.random() * 1000);
}

function handlePlay() {
  console.log(123);
  // 以 440 Hz 频率播放声音，持续 2 秒钟
  playSound(randomFreq, 0.5);
}

// 处理猜测按钮点击事件
function handleGuess() {
  if (guessValue === '') {
    console.log('输入危空');
  }
  const guessFreq = parseInt(guessValue, 10);

  if (isNaN(guessFreq)) {
    // 如果用户输入的不是有效的数字，则给出错误提示
    console.log('请输入有效的频率值！');
  } else {
    if (guessFreq === randomFreq) {
      alert('恭喜你，猜对了！');
    } else {
      alert(`很遗憾，猜错了！答案是${randomFreq}`);
    }
  }
}


</script>

<style scoped lang="scss">

</style>
