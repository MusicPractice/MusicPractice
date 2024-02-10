<script setup lang="ts">
import PianoPlayer from "~/services/pianoPlayer";
import Note from "~/services/note";

function playTest() {
  PianoPlayer.playNote('3_01');
  PianoPlayer.playNote('3_05');
  PianoPlayer.playNote('3_08');
  console.log('======');
  const n = Note.fromNoteName('G5');
  console.log(n.getFileName());
}

async function load() {
  await PianoPlayer.loadAudio('default');
  alert('加载完毕')
}

</script>

<template>
  <div class="test">
    <h1>playTest</h1>
    <button class="ring p-2" @click="load">加载音频</button>
    <button class="ring p-2" @click="playTest">播放声音</button>
  </div>
</template>

<style scoped lang="scss">

</style>