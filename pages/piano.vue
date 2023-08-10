<script setup lang="ts">
const keybind = ref<"genshin">("genshin");
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

function handleKeydown(ev: KeyboardEvent) {
  if (pressedKeys.value?.includes(ev.key)) {
    return;
  }
  pressedKeys.value?.push(ev.key);
  if (keybind.value === "genshin") {
    classesGenshin.value[ev.key.toUpperCase()].splice(
      classesGenshin.value[ev.key.toUpperCase()].indexOf("animate"),
      1
    );
    classesGenshin.value[ev.key.toUpperCase()].push("pressed");
    setTimeout(() => {
      classesGenshin.value[ev.key.toUpperCase()].push("animate");
    }, 0);
  }
}

function handleKeyup(ev: KeyboardEvent) {
  pressedKeys.value?.splice(pressedKeys.value.indexOf(ev.key), 1);
  if (keybind.value === "genshin") {
    classesGenshin.value[ev.key.toUpperCase()].splice(
      classesGenshin.value[ev.key.toUpperCase()].indexOf("pressed"),
      1
    );
  }
}

onMounted(() => {
  if (process.client) {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);
  }
});

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener("keydown", handleKeydown);
    window.removeEventListener("keyup", handleKeyup);
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
