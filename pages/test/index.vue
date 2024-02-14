<script setup lang="ts">
import PianoPlayer, {Timber} from "~/services/pianoPlayer";
import Note from "~/services/note";
import Chord, {ChordExtension, ChordType} from "~/services/chord";

function playTest() {
  console.log('======');
  const n = Note.fromNoteName('G5');
  console.log(n.getFileName());
}

async function load() {
  await PianoPlayer.loadAudio(Timber.defaultTimber);
  alert('加载完毕')
}


console.log('====')
console.log(ChordType.Maj);  // 0  number
console.log(ChordType.Maj === 0);  // 0  number
console.log(ChordType.Maj === '0');  // 0  number

console.log(ChordType[1]);  // Min  string
console.log(ChordType['1']);  // Min  string
console.log(ChordType.Maj);  // 0   number
console.log(ChordType['Min']);  // 1   number

console.log('___')
for (let item in ChordType) {
  console.log(item);
}
// '0', '1', '2', .... 'Maj', 'Min', ...
console.log('++++')
for (let item in Object.keys(ChordType)) {
  console.log(item)
}
// '0', '1', '2', .... 没有字面量

console.log('----')
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