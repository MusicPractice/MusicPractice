<script setup lang="ts">

import Note from '~/services/note';

const ranges = [
  {
    name: '小提琴',
    rangeArray: ['G3', 'E7'],
  },
  {
    name: '中提琴',
    rangeArray: ['C3', 'A6'],
  },
  {
    name: '大提琴',
    rangeArray: ['C2', 'A5'],
  },
  {
    name: '低音提琴',
    rangeArray: ['E1', 'C5'],
  },
  {
    name: '小号',
    rangeArray: ['F#3', 'C6'],
  },
  {
    name: '圆号',
    rangeArray: ['C2', 'C6'],
  },
  {
    name: '长号',
    rangeArray: ['E2', 'C5'],
  },
  {
    name: '低音号',
    rangeArray: ['E1', 'C4'],
  },
  {
    name: '原音吉他',
    rangeArray: ['E2', 'C6'],
  },
  {
    name: '电贝斯',
    rangeArray: ['E1', 'C5'],
  },
  {
    name: '贝斯',
    rangeArray: ['E1', 'E4'],
  },
  {
    name: '钢琴',
    rangeArray: ['A0', 'A5'],
  },
  {
    name: '长笛',
    rangeArray: ['B3', 'C6'],
  },
  {
    name: '单簧管',
    rangeArray: ['D3', 'G5'],
  },
  {
    name: '双簧管',
    rangeArray: ['A#3', 'C6'],
  },
  {
    name: '男低音',
    rangeArray: ['E2', 'E4'],
  },
  {
    name: '男中音',
    rangeArray: ['A2', 'G4'],
  },
  {
    name: '男高音',
    rangeArray: ['C3', 'G4'],
  },
  {
    name: '女低音',
    rangeArray: ['F3', 'D5'],
  },
  {
    name: '女中音',
    rangeArray: ['A3', 'G5'],
  },
  {
    name: '女高音',
    rangeArray: ['C4', 'C6'],
  },
];

/**
 * 将 [ C2, A5 ] 转换成css对象
 * @param rangeItem
 */
function computeRange(rangeItem: string[]) {
  const noteLow = Note.fromNoteName(rangeItem[0]);
  const noteHigh = Note.fromNoteName(rangeItem[1]);
  return {
    height: noteHigh.distance(noteLow) * 7 + 'px',
    top: Note.fromNoteName('C8').distance(noteHigh) * 7 + 'px',
  };
}

function computeTop(noteName: string) {
  console.log(Note.fromNoteName('C8').distance(Note.fromNoteName(noteName)) * 7);
  return {
    top: Note.fromNoteName('C8').distance(Note.fromNoteName(noteName)) * 7 + 'px',
  };
}
</script>

<template>
  <div class="overflow-auto">
    <h1 class="text-center text-3xl leading-loose">音域表</h1>

    <div class="flex w-full DiapasonTable overflow-auto">

      <div class="leftRange flex justify-end flex-col-reverse">
        <div class="groupRange text-center flex flex-col justify-center"
             v-for="i in range(0, 8)" :key="i">
          {{ i }}
        </div>
      </div>

      <div v-for="item in ranges" class="w-12 RangeCol relative group hover:bg-zinc-800 transition">
        <h3 class="text-center text-xs">{{ item.name }}</h3>
        <div class="bar w-0 border-4 -ml-1 h-full border-zinc-500 absolute left-1/2 group-hover:border-zinc-400"
             :style="computeRange(item.rangeArray)">
        </div>
        <span class="absolute w-full text-center h-6"
              :style="computeTop(item.rangeArray[0])">
          {{ item.rangeArray[0] }}
        </span>
        <span class="absolute w-full text-center h-6 -mt-6" :style="computeTop(item.rangeArray[1])">
          {{ item.rangeArray[1] }}
        </span>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.DiapasonTable {

  $halfHeight: 7px; // 一个半音的高度

  .leftRange {
    width: 30px;

    .groupRange {
      outline: solid 1px white;
      height: $halfHeight * 12;
    }
  }

  .RangeCol {
    height: 8 * $halfHeight * 12;

    .bar {

    }
  }
}
</style>