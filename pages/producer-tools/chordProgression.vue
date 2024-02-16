<script setup lang="ts">

import { numberToRoman } from '~/utils/strings';
import PianoPlayer, { ChordPlayMode } from '~/services/pianoPlayer';
import Chord from '~/services/chord';
import Note from '~/services/note';
import ChordProgressionComputer from '~/services/chordProgressionComputer';
import { range } from '~/utils/math';
import { dictToMatrix } from '~/utils/itertools';


const chordRate: Record<number, [string, number][]> = ChordProgressionComputer.chordRateTable;

function handleClickChord(n: number | string) {
  if (typeof n === 'string') {
    n = parseInt(n);
  }
  if (n > 7 || n < 1) {
    return;
  }
  // 加入数据
  inputChordArray.value.push(n);
  // 播放一下音频
  PianoPlayer.playChord(
    Chord.fromNumberInCMajorScale(n, 3),
    true,
    ChordPlayMode.Columnar,
  );
  PianoPlayer.playNote(Note.fromNumberInCMajorScale(n, 2));
}

function handleDeleteChord() {
  if (inputChordArray.value.length > 0) {
    inputChordArray.value.pop();
  }
}

function handleClearChord() {
  inputChordArray.value = [];
}

const inputChordArray = ref<number[]>([]);

</script>

<template>
  <div class="ChordProgression overflow-auto p-4">
    <h1 class="text-center text-3xl">和弦进行</h1>
    <h2>统计可能性</h2>
    <!-- todo v-for遍历对象的key来渲染 -->
    <p class="text-center">点击和弦可以听声音，若没有声音可以先去“键盘弹钢琴”界面加载音源</p>
    <section class="flex flex-wrap justify-center">
      <div class="w-96 flex justify-center items-center bg-zinc-600 m-4 rounded overflow-hidden"
           v-for="currentNote in range(1, 8)" :key="currentNote">
        <div
          @mousedown="handleClickChord(currentNote)"
          class="w-16 h-full text-center flex justify-center items-center hover:bg-zinc-800 cursor-pointer transition">
            <span class="text-3xl">
            {{ numberToRoman(currentNote) }}
            </span>
        </div>
        <div class="flex-1">
          <div @mousedown="handleClickChord(pair[0])"
               v-for="pair in chordRate[currentNote]"
               class="flex items-center hover:bg-zinc-700 cursor-pointer transition">
            <template v-if="pair[1] > 0.01">
              <span class="mx-2">{{ numberToRoman(pair[0]) }}</span>
              <span class="inline-block bg-zinc-500 rounded text-xs pl-1 truncate hover:text-clip"
                    :style="{width: `${pair[1] * 100 * 0.95}%`}">
                {{ (pair[1] * 100).toFixed(1) }}%
              </span>
            </template>
          </div>
        </div>
      </div>
    </section>
    <p class="text-center">上图中给出了每个和弦后面最可能接什么和弦的可能性，并降序排序</p>


    <section>
      <h2 class="text-3xl leading-loose">和弦进行推荐</h2>
      <!--按钮区域-->
      <h3>点击下面的按钮可以增删和弦序列</h3>
      <div class="flex justify-center">
        <button
          class="w-16 h-16 flex justify-center items-center bg-zinc-600 m-4 rounded text-xl"
          v-for="num in range(1, 8)"
          @mousedown="handleClickChord(num)"
          :key="`num-${num}`">
          {{ numberToRoman(num) }}
        </button>
        <button
          @click="handleDeleteChord"
          class="w-16 h-16 flex justify-center items-center bg-red-800 m-4 rounded text-xl">
          ←
        </button>
        <button
          @click="handleClearChord"
          class="w-16 h-16 flex justify-center items-center bg-red-800 m-4 rounded text-xl">
          X
        </button>
      </div>

      <!--实际输入区域-->
      <h3>以下区域为您的和弦输入序列</h3>
      <div class="flex flex-wrap items-center">
        <span
          class="text-xl bg-zinc-600 m-2 p-2 rounded"
          v-for="item in inputChordArray">{{ numberToRoman(item) }}</span>
        <span class="text-xl bg-zinc-600 m-2 p-2 rounded">?</span>
      </div>
      <!--推荐信息-->
      <h3>下一个和弦连接什么？算法穷举推荐指数</h3>
      <div>

        <div v-for="pair in dictToMatrix(ChordProgressionComputer.getNextChord(inputChordArray))"
             :key="pair[0]"
             class="flex">
          <span class="font-bold mx-1">{{ numberToRoman(parseInt(pair[0])) }}</span>
          <span class="w-16 flex items-center rounded px-1 text-sm">{{ (pair[1] * 100).toFixed(2) }}%</span>
          <div class="bg-zinc-800" :style="{width: `${pair[1] * 1000}px`}"></div>
        </div>
      </div>
    </section>

    <h2>大调系列</h2>

    <ul>
      <li>1245：刚学Cubase的时候老师给推荐的和弦进行</li>
      <li>
        1645：阳光感，大调，（褐色回忆/林荫小路）第二个6可以改为一个七和弦
      </li>
      <li>1 6m7 4 5sus</li>
      <li>1625：《风吹麦浪》</li>
      <li>1451 CFGC：超级阳光开朗的大调，《单调有界必有极限》</li>
      <li>1add9 - 4 - 5 - 1add9：我们都需要勇气...</li>
      <li>1545：非常阳光的和弦进行，小米的来电铃声</li>
      <li>1564：经典流行，《let it be》</li>
      <li>1325：雪夜山谷，温馨感</li>
      <li>
        251进行：大调Dm G C 小调 Ddim G Cm ，可以三全音替代 Dmin7 G7 Cmaj7
        小调：Dmin7 Db7 Cmaj7
      </li>
      <li>
        1314451 C-Em-C-F-F-G7-C：整活的空耳旋律抽取的和弦进行，《甘美风来》
      </li>
    </ul>
    <h2>小调系列</h2>
    <ul>
      <li>6543：小调和弦进行，黑暗风格（残梦霓虹的末日挽歌）末日火山</li>
      <li>6543 6523：对上面和弦进行的扩展（孤独星球）</li>
      <li>6541 6545：宏大史诗感（核污水时代）（三和弦的三级音向上八度）</li>
      <li>
        6415
        641(sus2)5：悲伤感小调（暗夜花火），事实上，好多的较为悲伤的歌曲都使用了这个和弦进行
      </li>
      <li>6415：Fade、《杀破狼》</li>
      <li>6533 6543：信息茧房</li>
      <li>6543 234(2大)：《流星云》</li>
      <li>6536：残梦霓虹的《好戏开场》弦乐断奏和弦，张力</li>
      <li>2456：小调但不悲伤，大提琴但拉2456不是三和弦，《虫战》</li>
      <li>2516：《贝加尔湖畔》</li>
      <li>6451：《偏爱》、《七里香》</li>
      <li>2615：适合战斗类游戏音乐的编曲（然后改成F调）《铁锈战争》</li>
      <li>
        4566：《晚夜微雨问海棠》视频教程里看的小调常用和弦进行，结束的时候就F->
        G-> Am
      </li>
      <li>
        4565(最好升成D调)：（遗憾的惆怅）一个老外教的，要把第三音向上翻阅八度
      </li>
      <li>
        3456(最好升成F#调)：（温馨中带有惆怅）一个老外教的，要把第三音向上翻阅八度，然后第一个和弦和最后一个和弦的最高音塞满全部
      </li>
      <li>
        6524(最好降成Bb调)：（凄凉悲伤）一个老外教的，要把第三音向上翻阅八度，然后前三个注释和弦都补充最后一个和弦的最高音
      </li>
      <li>
        G D A Bm
        （G调的小忧伤）：三音上翻八度，前两个小节温馨温暖，后两个小节突然忧伤
      </li>
    </ul>
    <h2>古典/流行</h2>
    <ul>
      <li>卡农进行：C-G-Am-Em-F-C-F-G（15634145）（15634125也可）</li>
      <li>卡农变体：17654321、或者17654325</li>
      <li>经典流行：4536251：经典流行歌曲的和弦进行（稍微有点伤感）</li>
      <li>经典流行变体：4436251</li>
    </ul>
    <h2>影视/史诗乐/系列</h2>
    <ul>
      <li>
        《盗梦空间》：[2（向下转位1）-6（三级音上八度）-1-5（中上八度）]-[24（中替3上八度）15]，整个从C升成G调
      </li>
      <li>《盗梦空间》：Am-Em-G-D（一个b站评论）+C G B F#</li>
    </ul>
    <h2>终止式的和弦进行</h2>
    <ul>
      <li>变格终止：Dm7 -> G -> Fm -> C</li>
      <li>阻碍终止：Dm7 -> G -> Am</li>
      <li>借用和弦：Dm7 -> G -> Ab -> Bb -> C</li>
    </ul>
    <h2>和弦小技巧</h2>
    <ul>
      <li>转位（基操）</li>
      <li>将三级音向上一个八度，国外和电音常用</li>
      <li>
        不同的套路和弦之间可以进行东拼西凑，比如卡农进行和经典流行进行拼接
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.ChordProgression {
  line-height: 2em;

  h1, h2 {
    text-align: center;
  }
}
</style>