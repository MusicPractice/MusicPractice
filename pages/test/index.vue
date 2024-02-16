<script setup lang="ts">
import PianoPlayer, { Timber } from '~/services/pianoPlayer';
import Note from '~/services/note';
import Chord, { ChordExtension, ChordType } from '~/services/chord';
import ChordProgression from '~/services/chordProgression';
import ChordProgressionSet from '~/services/chordProgressionSet';
import { counterToRate } from '~/utils/itertools';

onMounted(() => {
  // for (const item of Object.keys(ChordType)) {
  //   console.log(item);
  // }
  for (const item in Object.keys(ChordType)) {
    console.log(item);
  }
});
</script>

<template>
  <div class="test">
    <h1>playTest</h1>

  </div>
</template>

<style scoped lang="scss">

</style>