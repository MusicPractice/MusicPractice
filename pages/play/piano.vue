<script setup lang="ts">

import PianoPlayer from "~/services/pianoPlayer";
import Note from "~/services/note";
import Chord from "~/services/chord";

const keybind = ref<string>("genshin");

// 用于渲染界面上的所有键盘
const keysGenshin = ref<string[][]>([
  ["Q", "W", "E", "R", "T", "Y", "U"],
  ["A", "S", "D", "F", "G", "H", "J"],
  ["Z", "X", "C", "V", "B", "N", "M"],
]);

// prettier-ignore
const classesGenshin = ref<Record<string, string[]>>({
  Q: [], W: [], E: [], R: [], T: [], Y: [], U: [],
  A: [], S: [], D: [], F: [], G: [], H: [], J: [],
  Z: [], X: [], C: [], V: [], B: [], N: [], M: [],
});
const pressedKeys = ref<string[]>([]);

// 按键到音符的映射表
const keyToNote = ref<Record<string, Note>>({
  // 第一行
  "Q": Note.fromNoteName('C5'),
  "W": Note.fromNoteName('D5'),
  "E": Note.fromNoteName('E5'),
  "R": Note.fromNoteName('F5'),
  "T": Note.fromNoteName('G5'),
  "Y": Note.fromNoteName('A5'),
  "U": Note.fromNoteName('B5'),
  // 第二行
  "A": Note.fromNoteName('C4'),
  "S": Note.fromNoteName('D4'),
  "D": Note.fromNoteName('E4'),
  "F": Note.fromNoteName('F4'),
  "G": Note.fromNoteName('G4'),
  "H": Note.fromNoteName('A4'),
  "J": Note.fromNoteName('B4'),
  // 第三行
  "Z": Note.fromNoteName('C3'),
  "X": Note.fromNoteName('D3'),
  "C": Note.fromNoteName('E3'),
  "V": Note.fromNoteName('F3'),
  "B": Note.fromNoteName('G3'),
  "N": Note.fromNoteName('A3'),
  "M": Note.fromNoteName('B3'),
});

// 按键到和弦的映射
const keyToChord = ref({
  "1": Chord.fromName('CMaj'),
  "2": Chord.fromName('DMin'),
  "3": Chord.fromName('EMin'),
  "4": Chord.fromName('FMaj'),
  "5": Chord.fromName('GMaj'),
  "6": Chord.fromName('AMin'),
  "7": Chord.fromName('BDim'),
})

function handleKeydown(ev: KeyboardEvent) {
  if (pressedKeys.value?.includes(ev.key)) {
    return;
  }
  if (!/^[a-z]|[1-9]$/.test(ev.key)) {
    return;
  }
  if (/^[a-z]$/.test(ev.key)) {
    // 字母
    PianoPlayer.playNote(keyToNote.value[ev.key.toUpperCase()]);
  } else {
    // 和弦
    PianoPlayer.playChord(keyToChord.value[ev.key], true);
  }


  pressedKeys.value?.push(ev.key);
  if (keybind.value === "genshin") {
    // 字母
    if (/^[a-z]$/.test(ev.key)) {
      classesGenshin.value[ev.key.toUpperCase()].splice(
          classesGenshin.value[ev.key.toUpperCase()].indexOf("animate"),
          1
      );
      classesGenshin.value[ev.key.toUpperCase()].push("pressed");
      setTimeout(() => {
        classesGenshin.value[ev.key.toUpperCase()].push("animate");
      }, 0);
    } else {
      const pressChord: Chord = keyToChord.value[ev.key];
      console.log()
    }
  }
}

function handleKeyup(ev: KeyboardEvent) {
  if (!/^[a-z]|[1-9]$/.test(ev.key)) {
    return;
  }
  pressedKeys.value?.splice(pressedKeys.value.indexOf(ev.key), 1);
  if (keybind.value === "genshin") {

    if (/^[a-z]$/.test(ev.key)) {
      classesGenshin.value[ev.key.toUpperCase()].splice(
          classesGenshin.value[ev.key.toUpperCase()].indexOf("pressed"),
          1
      );
    }

  }
}

onMounted(async () => {
  if (process.client) {
    await PianoPlayer.loadAudio('default');
    alert('加载完毕');

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);
  }
});

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("keyup", handleKeyup);
  }
});
</script>

<template>
  <div class="piano">
    <div class="visual"></div>
    <div class="keybind genshin" v-if="keybind === 'genshin'">
      <div class="row" v-for="row in keysGenshin">
        <div class="col" v-for="col in row" :class="classesGenshin[col]">
          {{ col }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.piano {
  padding: 8rem 15rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .keybind {
    width: 100%;

    &.genshin {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 1.5rem;

      .row {
        display: flex;
        gap: 1.5rem;

        .col {
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
          background-color: #eee;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #111;
          font-size: 150%;
          position: relative;
          transition: all 0.3s;

          &::before,
          &::after {
            content: "";
            position: absolute;
            width: 4rem;
            height: 4rem;
            border: 3px solid #ccc;
            border-radius: 50%;
          }

          &.pressed {
            filter: invert(100%);
          }

          &.animate::after {
            animation: anim 0.6s;

            @keyframes anim {
              100% {
                width: 8rem;
                height: 8rem;
                opacity: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
