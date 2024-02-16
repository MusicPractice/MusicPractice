<template>
  <div class="TranscribeMusic">
    <h1 class="text-3xl leading-loose">扒谱学习</h1>
    <div class="flex justify-center my-2">
      <span>如果要查询游戏相关音乐</span>
      <input type="text" placeholder="请在这里输入游戏名称" v-model="inputName">
    </div>
    <main>
      <table>
        <thead>
        <tr>
          <th>分类</th>
          <th>乐曲名称</th>
          <th>拍号</th>
          <th>bpm</th>
          <th>调式</th>
          <th>调性</th>
          <th>情绪描述</th>
          <th>和弦进行</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="item in tableList" :key="item.type + item.name">
          <tr v-if="isShow(item.type)">
            <td>{{ item.type }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.timeSignature }}</td>
            <td>{{ item.bpm }}</td>
            <td>{{ item.mode }}</td>
            <td>{{ item.keySignature }}</td>
            <td></td>
            <td>{{ item.chord }}</td>
          </tr>
        </template>
        </tbody>
      </table>
    </main>

  </div>
</template>

<script setup lang="ts">
const majorScale = '大调';
const minorScale = '小调';
const fourFourTime = '4/4';
const threeFourTime = '3/4';
const gameType = '游戏音乐/';
const movieType = '电影配乐/';
const lifeType = '生活场景/';

const inputName = ref<string>('');

function isShow(typeName: string): boolean {
  console.log('pjdr', typeName);
  if (typeName.startsWith('游戏音乐')) {
    if (inputName.value === '') return false;
    return typeName.includes(inputName.value);
  }
  return true;
}

const tableList = [
  {
    type: gameType + '赛尔号',
    name: 'boss对决',
    timeSignature: fourFourTime,
    bpm: 134,
    mode: minorScale,
    keySignature: 'B小调->D小调->E小调->G小调',
    chord: '-',
  },
  {
    type: gameType + '赛尔号',
    name: '精灵对战',
    timeSignature: fourFourTime,
    bpm: 143,
    mode: majorScale,
    keySignature: 'A小调->C#小调',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '亚比对战',
    timeSignature: fourFourTime,
    bpm: 145,
    mode: minorScale,
    keySignature: 'A小调',
    chord: '-',
  },
  {
    type: gameType + '乐园过山车',
    name: '主界面',
    timeSignature: fourFourTime,
    bpm: 112,
    mode: minorScale,
    keySignature: 'A#小调',
    chord: '-',
  },
  {
    type: movieType + '终结者2',
    name: '主题曲',
    timeSignature: fourFourTime,
    bpm: 115,
    mode: minorScale,
    keySignature: 'D#小调',
    chord: '-',
  },
  {
    type: gameType + '铁锈战争',
    name: '背景音乐',
    timeSignature: fourFourTime,
    bpm: 125,
    mode: minorScale,
    keySignature: 'D小调',
    chord: '-',
  },

  {
    type: gameType + '皇室战争',
    name: '战斗',
    timeSignature: fourFourTime,
    bpm: 112,
    mode: minorScale,
    keySignature: 'B小调',
    chord: '-',
  },

  {
    type: gameType + '穿越火线',
    name: '房间等待',
    timeSignature: fourFourTime,
    bpm: 130,
    mode: minorScale,
    keySignature: 'B小调',
    chord: '-',
  },
  {
    type: gameType + 'Minecraft',
    name: '背景音乐',
    timeSignature: fourFourTime,
    bpm: 130,
    mode: majorScale,
    keySignature: 'D大调',
    chord: '-',
  },
  {
    type: gameType + '狂扁小朋友',
    name: '背景音乐',
    timeSignature: fourFourTime,
    bpm: 138,
    mode: minorScale,
    keySignature: 'C小调',
    chord: '6451 6543',
  },
  {
    type: gameType + '粘粘世界',
    name: '高塔关卡',
    timeSignature: fourFourTime,
    bpm: 85,
    mode: majorScale,
    keySignature: 'C大调',
    chord: '6451 6543',
  },
  {
    type: gameType + '粘粘世界',
    name: '大桥颂歌',
    timeSignature: fourFourTime,
    bpm: 110,
    mode: majorScale,
    keySignature: 'C大调->E大调',
    chord: '-',
  },
  {
    type: gameType + '雷电3',
    name: '关卡3-海洋',
    timeSignature: fourFourTime,
    bpm: 145,
    mode: minorScale,
    keySignature: 'F小调',
    chord: '-',
  },
  {
    type: gameType + '死亡阴影3',
    name: '战斗',
    timeSignature: fourFourTime,
    bpm: 140,
    mode: minorScale,
    keySignature: 'B小调',
    chord: '-',
  },
  {
    type: gameType + '虫虫大作战',
    name: '战斗',
    timeSignature: fourFourTime,
    bpm: 125,
    mode: minorScale,
    keySignature: 'F小调',
    chord: '-',
  },
  {
    type: gameType + '洛克王国',
    name: '彼得大道',
    timeSignature: fourFourTime,
    bpm: 130,
    mode: majorScale,
    keySignature: 'F大调',
    chord: '-',
  },
  {
    type: gameType + '洛克王国',
    name: '家园',
    timeSignature: fourFourTime,
    bpm: 110,
    mode: majorScale,
    keySignature: 'D大调',
    chord: '-',
  },
  {
    type: gameType + '雷电3',
    name: '关卡2-黄土高原',
    timeSignature: fourFourTime,
    bpm: 120,
    mode: minorScale,
    keySignature: 'C小调',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '战斗星域',
    timeSignature: fourFourTime,
    bpm: 150,
    mode: minorScale,
    keySignature: 'G小调',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '流星购物街',
    timeSignature: fourFourTime,
    bpm: 135,
    mode: '-',
    keySignature: '-',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '艾希区',
    timeSignature: threeFourTime,
    bpm: 123,
    mode: '-',
    keySignature: '-',
    chord: '-',
  },
  {
    type: lifeType + '小米铃声',
    name: '来电',
    timeSignature: fourFourTime,
    bpm: 78,
    mode: majorScale,
    keySignature: 'D大调',
    chord: '1545',
  },
  {
    type: gameType + '奥拉星',
    name: '欢乐岛',
    timeSignature: fourFourTime,
    bpm: 127,
    mode: majorScale,
    keySignature: 'D大调',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '上古神殿',
    timeSignature: fourFourTime,
    bpm: 56,
    mode: majorScale,
    keySignature: 'G大调',
    chord: '1241 6251',
  },
  {
    type: gameType + '奥拉星',
    name: '比特区',
    timeSignature: fourFourTime,
    bpm: 140,
    mode: minorScale,
    keySignature: 'A小调',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '生态园',
    timeSignature: fourFourTime,
    bpm: 120,
    mode: majorScale,
    keySignature: 'C#小调',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '海文花园',
    timeSignature: fourFourTime,
    bpm: 89,
    mode: majorScale,
    keySignature: 'Eb大调',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '幻影冰宫',
    timeSignature: fourFourTime,
    bpm: 80,
    mode: '',
    keySignature: '',
    chord: '',
  },
  {
    type: gameType + '奥拉星',
    name: '海枯之星',
    timeSignature: threeFourTime,
    bpm: 159,
    mode: majorScale,
    keySignature: 'D大调',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '思伍德区',
    timeSignature: fourFourTime,
    bpm: 96,
    mode: '混合利底亚调式',
    keySignature: '纯白键',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '沃尔特区',
    timeSignature: fourFourTime,
    bpm: 90,
    mode: '爵士乐',
    keySignature: '-',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: 'hello学院',
    timeSignature: fourFourTime,
    bpm: 144,
    mode: majorScale,
    keySignature: 'Eb大调',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '家园',
    timeSignature: fourFourTime,
    bpm: 120,
    mode: majorScale,
    keySignature: 'Bb大调',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '风车谷',
    timeSignature: fourFourTime,
    bpm: 130,
    mode: majorScale,
    keySignature: 'D大调',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '白灵圣殿',
    timeSignature: fourFourTime,
    bpm: 85,
    mode: minorScale,
    keySignature: 'A小调',
    chord: '-',
  },
  {
    type: movieType + '盗梦空间',
    name: '主题曲',
    timeSignature: fourFourTime,
    bpm: 65,
    mode: minorScale,
    keySignature: 'G调',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '大地迷城',
    timeSignature: fourFourTime,
    bpm: 110,
    mode: majorScale,
    keySignature: 'C大调',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '独角之星',
    timeSignature: fourFourTime,
    bpm: 116,
    mode: '多利安调式',
    keySignature: 'C调',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '云端王国',
    timeSignature: fourFourTime,
    bpm: 124,
    mode: majorScale,
    keySignature: 'C大调',
    chord: '-',
  },
  {
    type: gameType + '奥拉星',
    name: '藤蔓峡谷',
    timeSignature: fourFourTime,
    bpm: 90,
    mode: minorScale,
    keySignature: 'A小调',
    chord: '-',
  },
];
</script>

<style lang="scss">
.TranscribeMusic {
  overflow: auto;
  padding-bottom: 200px;

  h1 {
    text-align: center;
  }

  main {
    width: 90%;
    margin: 0 auto;

    table {
      width: 100%;
      line-height: 2em;

      thead {
        background-color: black;
      }
    }
  }

}
</style>
