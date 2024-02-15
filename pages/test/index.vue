<script setup lang="ts">
import PianoPlayer, { Timber } from '~/services/pianoPlayer';
import Note from '~/services/note';
import Chord, { ChordExtension, ChordType } from '~/services/chord';
import ChordProgression from '~/services/chordProgression';
import ChordProgressionSet from '~/services/chordProgressionSet';
import { counterToRate } from '~/utils/itertools';

const c1 = ChordProgression.fromNumbersInCScale(1, 6, 4, 5);
const c2 = ChordProgression.fromNumbersInCScale(5, 1, 4);
console.log(c1.getNextChord(c2)?.getChordName());

const arr = [1, 2, 3, 4];
console.log(arr.slice(2, 3)); // [3]

console.log(counterToRate({ 'a': 4, 'b': 1 }));
console.log(counterToRate({ 'a': 0, 'b': 0 }));
</script>

<template>
  <div class="test">
    <h1>playTest</h1>

  </div>
</template>

<style scoped lang="scss">

</style>