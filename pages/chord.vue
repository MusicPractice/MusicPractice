<template>
  <div class="Chord">
    <!-- <h1>和弦总结</h1>
    <table>
      <thead>
        <tr>
          <th>英文名</th>
          <th>中文名</th>
          <th>听感</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="chord in chords" :key="chord.id">
          <td>{{ chord.englishName }}</td>
          <td>{{ chord.chineseName }}</td>
          <td>{{ chord.feel }}</td>
        </tr>
      </tbody>
    </table> -->
    <h1>和弦进行</h1>
    <h2>大调系列</h2>
    <ul>
      <li>1245：刚学Cubase的时候老师给推荐的和弦进行</li>
      <li>1645：阳光感，大调，（褐色回忆/林荫小路）第二个6可以改为一个七和弦</li>
      <li>1451 CFGC：超级阳光开朗的大调，《单调有界必有极限》</li>
      <li>1545：非常阳光的和弦进行，小米的来电铃声</li>
      <li>1325：雪夜山谷，温馨感</li>
      <li>4536251：经典流行歌曲的和弦进行（稍微有点伤感）</li>
      <li>251进行：大调Dm G C 小调 Ddim G Cm ，可以三全音替代 Dmin7 G7 Cmaj7 小调：Dmin7 Db7 Cmaj7</li>
      <li>1314451 C-Em-C-F-F-G7-C：整活的空耳旋律抽取的和弦进行，《甘美风来》</li>
    </ul>
    <h2>小调系列</h2>
    <ul>
      <li>6543：小调和弦进行，黑暗风格（残梦霓虹的末日挽歌）末日火山</li>
      <li>6543 6523：对上面和弦进行的扩展（孤独星球）</li>
      <li>6541 6545：宏大史诗感（核污水时代）（三和弦的三级音向上八度）</li>
      <li>6415 641(sus2)5：悲伤感小调（暗夜花火）</li>
      <li>6533 6543：信息茧房</li>
      <li>6543 234(2大)：《流星云》</li>
      <li>6536：残梦霓虹的《好戏开场》弦乐断奏和弦，张力</li>
      <li>2456：小调但不悲伤，大提琴但拉2456不是三和弦，《虫战》</li>
      <li>2615：适合战斗类游戏音乐的编曲（然后改成F调）《铁锈战争》</li>
      <li>4566：视频教程里看的小调常用和弦进行，结束的时候就F-> G-> Am</li>
    </ul>
    <h2>古典/流行</h2>
    <ul>
      <li>卡农进行：C-G-Am-Em-F-C-F-G（15634145）</li>
      <li>平凡之路：G-Am-Bm-C-D-Em（G大调）===>转C后是：C-Dm-Em-F-G-Em（123453）</li>
    </ul>
    <h2>影视/史诗乐/系列</h2>
    <ul>
      <li>《盗梦空间》：[2（向下转位1）-6（三级音上八度）-1-5（中上八度）]-[24（中替3上八度）15]，整个从C升成G调</li>
      <li>《盗梦空间》：Am-Em-G-D（一个b站评论）+C G B F#</li>

    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chords: [
        { id: 1, englishName: "Major", chineseName: "大三和弦", feel: "明亮/开心" },
        { id: 2, englishName: "Minor", chineseName: "小三和弦", feel: "阴冷/悲伤" },
        { id: 3, englishName: "D7", chineseName: "D7", feel: "有张力" }
        // 添加更多和弦数据
      ]
    };
  }
};
</script>

<style lang="scss">
.Chord {
  overflow: auto;
  padding: 20px 50px;
  padding-bottom: 200px;

  h1 {
    text-align: center;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th,
    td {
      // border: 1px solid whitesmoke;
      padding: 10px;
      text-align: center;
    }

    th {
      background-color: black;
    }
  }

  li {
    line-height: 2em;
  }
}
</style>
