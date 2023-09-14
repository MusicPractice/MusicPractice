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

// 在页面加载时预先加载音频文件
const audioFiles = {};

function loadAudioFiles() {
  const audioNames = ['古典大钢琴.m4a'];
  const audioPromises = audioNames.map((audioName) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(`/audio/${audioName}`);
      audio.addEventListener('canplaythrough', () => {
        audioFiles[audioName] = audio;
        resolve();
      });
      audio.addEventListener('error', () => {
        reject(new Error(`Failed to load audio file: ${audioName}`));
      });
    });
  });

  return Promise.all(audioPromises);
}

/**
 * 播放音效函数
 */
function playNote() {
  const audioContext = new AudioContext();
  const audioSource = audioContext.createBufferSource();

  // 解码音频文件为AudioBuffer对象
  // audioContext.decodeAudioData(audioFiles['古典大钢琴.m4a'], function(buffer) {
  //   // 将解码后的AudioBuffer对象设置给音频源节点
  //   audioSource.buffer = buffer;
  //   // 连接音频源节点到音频输出
  //   audioSource.connect(audioContext.destination);
  //   // 播放音频
  //   audioSource.start();
  // });

  const startOffset = 4;
  const endOffset = 8;
  const duration = endOffset - startOffset;
  const sampleRate = audioBuffer.sampleRate;
  const startSample = startOffset * sampleRate;
  const endSample = endOffset * sampleRate;
  const numChannels = audioBuffer.numberOfChannels;
// 创建一个新的AudioBuffer来存储截取的音频数据
  const slicedBuffer = audioContext.createBuffer(
      numChannels,
      endSample - startSample,
      sampleRate
  );
// 复制截取的音频数据到新的AudioBuffer中
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = audioBuffer.getChannelData(channel);
    const slicedChannelData = slicedBuffer.getChannelData(channel);
    for (let i = startSample, j = 0; i < endSample; i++, j++) {
      slicedChannelData[j] = channelData[i];
    }
  }
// 将截取的音频数据设置给音频源节点
  audioSource.buffer = slicedBuffer;
// 连接音频源节点到音频输出
  audioSource.connect(audioContext.destination);
// 播放音频
  audioSource.start();
}


function handleKeydown(ev: KeyboardEvent) {
  if (pressedKeys.value?.includes(ev.key)) {
    return;
  }
  console.log(ev.key);
  playNote();
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
    // 在页面加载时调用loadAudioFiles函数预先加载音频文件
    loadAudioFiles()
        .then(() => {
          console.log('所有音色已经加载了');
        })
        .catch((error) => {
          console.error(error);
        });
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
