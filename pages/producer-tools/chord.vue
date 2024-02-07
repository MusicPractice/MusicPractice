<template>
  <div class="Chord">
    <h1>和弦</h1>
    <table>
      <thead>
      <tr>
        <th></th>
        <th>Maj</th>
        <th>Min</th>
        <th>Dim</th>
        <th>Aug</th>
        <th>Sus2</th>
        <th>Sus4</th>
        <th>5</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>--</td>
        <td>开心/终止</td>
        <td>伤心/暗淡</td>
        <td>紧张</td>
        <td>惊悚/悬疑</td>
        <td>悠闲/甜蜜</td>
        <td>深情/飞扬/终止前</td>
        <td>禅意</td>
      </tr>
      <tr>
        <td>6</td>
        <td>梅花感</td>
        <td>害怕</td>
        <td>更紧张</td>
        <td>-</td>
        <td>增添丝力量</td>
        <td>抑制飞扬增加沉稳</td>
        <td>明亮感</td>
      </tr>
      <tr>
        <td>7</td>
        <td>紧绷感</td>
        <td>淡化伤心</td>
        <td>空灵紧张</td>
        <td>流行感悬疑</td>
        <td>略紧张害怕</td>
        <td>减缓飞扬增加明亮</td>
        <td>不协和</td>
      </tr>
      <tr>
        <td>Maj7</td>
        <td>空灵感</td>
        <td>焦虑</td>
        <td>-</td>
        <td>终止感悬疑</td>
        <td>深情饱满甜蜜</td>
        <td>更沉稳的终止前</td>
        <td>空灵感</td>
      </tr>
      <tr>
        <td>add9</td>
        <td>华语流行感</td>
        <td>梦幻悲伤</td>
        <td>极其惊吓</td>
        <td>悬疑</td>
        <td>温馨安逸感</td>
        <td>增加一点流行感</td>
        <td>禅意流</td>
      </tr>
      <tr>
        <td>9</td>
        <td>焦虑感</td>
        <td>缓解悲伤</td>
        <td>非常害怕</td>
        <td>悬疑</td>
        <td>小紧张悲伤</td>
        <td>更加亮耳</td>
        <td>撞音明亮</td>
      </tr>
      <tr>
        <td>11</td>
        <td>冷酷感</td>
        <td @click="login">看开了</td>
        <td>有点害怕</td>
        <td>悬疑</td>
        <td>小励志/终止感</td>
        <td>更加饱满</td>
        <td>撞音明亮</td>
      </tr>
      <tr>
        <td>13</td>
        <td>惊悚感</td>
        <td @click="exit">不安</td>
        <td>比较害怕</td>
        <td>撞音悬疑</td>
        <td>涟漪感离别</td>
        <td>更加涟漪感</td>
        <td>幽怨感</td>
      </tr>
      </tbody>
    </table>
    <h1>和弦进行</h1>
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
      <li>6415：《杀破狼》</li>
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
        G D A B
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

<script>
useSeoMeta({
  title: "个人音乐作品展 | 和弦笔记",
  description: "学习各种和弦的笔记, 以及各种和弦进行",
  keywords: "音乐, 和弦, 和弦进行, 乐理, 大调, 小调, 流行音乐",
});
export default {
  data() {
    return {
      chords: [
        {
          id: 1,
          englishName: "Major",
          chineseName: "大三和弦",
          feel: "明亮/开心",
        },
        {
          id: 2,
          englishName: "Minor",
          chineseName: "小三和弦",
          feel: "阴冷/悲伤",
        },
        {id: 3, englishName: "D7", chineseName: "D7", feel: "有张力"},
        // 添加更多和弦数据
      ],
      meta: {
        hid: "hid",
        name: "description",
        content: "关于我们页面的描述",
      },
    };
  },
  methods: {
    login() {
      window.location.href =
          "https://github.com/login/oauth/authorize?client_id=7122f296ba2602fb0ff1";
    },
    exit() {
      localStorage.removeItem("token");
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
.Chord {
  overflow: auto;
  padding: 20px 50px;
  padding-bottom: 200px;

  h1 {
    text-align: center;
    font-size: 30px;
  }

  h2 {
    font-size: 25px;
    line-height: 2em;
  }

  li {
    line-height: 2em;
  }
}
</style>
