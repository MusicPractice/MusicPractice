<script setup lang="ts">

import PianoPlayer, {Timber} from "~/services/pianoPlayer";
import Note from "~/services/note";
import Chord from "~/services/chord";

/**
 * todo 可以来一个自动和弦伴奏
 *
 */


/**
 * 当前是否是正在加载音源的阶段
 */
const isLoading = ref<boolean>(true);

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

/**
 * 按数字相当于按一些和弦
 */
const keyNumberToKeyAlphaSet: Record<string, string[]> = {
  "1": ['Z', 'C', 'B'],
  "2": ['X', 'V', 'N'],
  "3": ['C', 'B', 'M'],
  "4": ['V', 'N', 'Z'],
  "5": ['B', 'M', 'X'],
  "6": ['N', 'Z', 'C'],
  "7": ['M', 'X', 'V'],
}

function handleKeydown(ev: KeyboardEvent) {
  if (pressedKeys.value?.includes(ev.key)) {
    return;
  }
  if (!/^[a-z]|[1-9]$/.test(ev.key)) {
    return;
  }

  // 1 播放声音
  if (/^[a-z]$/.test(ev.key)) {
    // 字母
    PianoPlayer.playNote(keyToNote.value[ev.key.toUpperCase()]);
  } else {
    // 和弦
    let chord: Chord = Chord.fromName('CMaj');
    switch (ev.key) {
      case "1":
        chord = Chord.fromName('CMaj');
        break;
      case "2":
        chord = Chord.fromName('DMin');
        break;
      case "3":
        chord = Chord.fromName('EMin');
        break;
      case "4":
        chord = Chord.fromName('FMaj');
        break;
      case "5":
        chord = Chord.fromName('GMaj');
        break;
      case "6":
        chord = Chord.fromName('AMin');
        break;
      case "7":
        chord = Chord.fromName('BDim');
        break;
    }
    PianoPlayer.playChord(chord, true);
  }


  // 播放动画
  pressedKeys.value?.push(ev.key);
  if (keybind.value === "genshin") {
    // 字母
    if (/^[a-z]$/.test(ev.key)) {
      console.log(ev.key.toUpperCase());
      addPressedAnimateToKey(ev.key.toUpperCase());
    } else {
      for (let key of keyNumberToKeyAlphaSet[ev.key]) {
        addPressedAnimateToKey(key);
      }
    }
  }
}

/**
 * 加载按下某个键的动画
 * @param keyNameUpperCase {string} 保证大写
 */
function addPressedAnimateToKey(keyNameUpperCase: string) {

  classesGenshin.value[keyNameUpperCase].splice(
      classesGenshin.value[keyNameUpperCase].indexOf("animate"),
      1
  );
  classesGenshin.value[keyNameUpperCase].push("pressed");
  setTimeout(() => {
    classesGenshin.value[keyNameUpperCase].push("animate");
  }, 0);
}

/**
 * 取消某个按键上的动画
 * @param keyNameUpperCase {string} 保证大写
 */
function removePressedAnimateToKey(keyNameUpperCase: string) {
  classesGenshin.value[keyNameUpperCase].splice(
      classesGenshin.value[keyNameUpperCase].indexOf("pressed"),
      1
  );
}

function handleKeyup(ev: KeyboardEvent) {
  if (!/^[a-z]|[1-9]$/.test(ev.key)) {
    return;
  }
  pressedKeys.value?.splice(pressedKeys.value.indexOf(ev.key), 1);
  if (keybind.value === "genshin") {

    if (/^[a-z]$/.test(ev.key)) {
      removePressedAnimateToKey(ev.key.toUpperCase());
    } else {
      for (let key of keyNumberToKeyAlphaSet[ev.key]) {
        removePressedAnimateToKey(key);
      }
    }
  }
}

onMounted(async () => {
  if (process.client) {
    await PianoPlayer.loadAudio(Timber.defaultTimber);
    isLoading.value = false;

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

const currentTimber = ref<string>("defaultTimber");

async function handleChangeTimber() {
  console.log(currentTimber.value);
  console.log(Timber[currentTimber.value]);
  await PianoPlayer.changeTimber(Timber[currentTimber.value]);
  alert('更改完毕');
}

</script>

<template>
  <div class="piano">
    <template v-if="isLoading">
      <div class="flex justify-center items-center">
        <h1 class="text-3xl">加载音源中......</h1>
      </div>
    </template>

    <template v-else>
      <select @change="handleChangeTimber" v-model="currentTimber"
              class="absolute right-2 top-2 ring rounded ring-allogenes-deep">
        <option value="defaultTimber">默认音源</option>
        <option value="genshinPoetry">原神-风物之诗琴</option>
        <option value="genshinMirror">原神-镜花之琴</option>
      </select>
      <div class="keybind genshin" v-if="keybind === 'genshin'">
        <div class="row" v-for="row in keysGenshin">
          <div class="col" v-for="col in row" :class="classesGenshin[col]">
            {{ col }}
          </div>
        </div>
      </div>
    </template>

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
