<template>
  <div class="p-2 leading-loose overflow-auto">
    <h1 class="text-2xl text-center leading-loose">个人拙作</h1>

    <p class="text-center">一年以后再看一年以前自己创作的内容会感觉很尴尬。</p>
    <p class="text-center">尴尬也好，也能说明自己在进步</p>
    <main class="flex flex-wrap justify-center">
      <section
          class="p-2 w-64 bg-allogenes m-1 rounded-xl"
          v-for="(item, i) in works"
          :key="i">
        <h2 class="text-xl">{{ item.title }}</h2>
        <p class="text-xs">{{ item.scale }}</p>
        <p class="text-xs">{{ item.timeSignature }}</p>
        <p>{{ item.describe }}</p>
      </section>
    </main>

  </div>
</template>

<script lang="ts" setup>
const works = [
  {
    title: '雪夜山谷',
    describe: '创作于 2022.11 第一首旋律，创作方法是自己脑补哼出来',
    scale: 'C#',
    timeSignature: '3/4',
  },
  {
    title: '未来城市',
    describe: '创作于 2023.2 在最后一次去学校的高铁上写的曲子，后来用于《比特山》中的背景音乐',
    scale: 'A#小调',
    timeSignature: '4/4',
  },
  {
    title: '中世纪的独木桥',
    describe: '创作于 2023.3 改编自《英雄无敌3死亡阴影》主界面，用于《CannonWar》js塔防游戏',
    scale: '小调',
    timeSignature: '4/4',
  },
  {
    title: '超新星纪元的南极洲',
    describe: '创作于 2023.5 内容灵感来自于刘慈欣的科幻小说《超新星纪元》第一次使用chatGPT写的一首歌',
    scale: '小调',
    timeSignature: '4/4',
  },
  {
    title: '量子玫瑰',
    describe: '创作于 2023.6 第一次使用chatGPT写的一首歌',
    scale: '小调',
    timeSignature: '4/4',
  },
  {
    title: '暗夜花火',
    describe: '创作于 2023.7',
    scale: '小调，且多次转调',
    timeSignature: '4/4',
  },
  {
    title: '褐色回忆',
    describe: '2023.8 在库乐队的琴上试出来的旋律，后来用ai扩写旋律，丰富和弦',
    scale: 'C大调',
    timeSignature: '4/4',
  },
  {
    title: '云端王国（Remix）',
    describe: '2023.9 从此开启了管弦乐的学习和编曲',
    scale: '小调',
    timeSignature: '4/4',
  },
  {
    title: '孤独星球',
    describe: '2023.10 ai生成的前奏，后续用弦乐完善，缺少铜管',
    scale: '小调',
    timeSignature: '4/4',
  },
  {
    title: '光明的前程',
    describe: '2023.11 改编自以前的拙作《单调有界必有极限》，引入了一些弦乐',
    scale: '大调',
    timeSignature: '4/4',
  },
  {
    title: '带上她的眼睛',
    describe: '2023.12 灵感来自于刘慈欣的短篇科幻小说《带上她的眼睛》',
    scale: '小调',
    timeSignature: '4/4',
  },
  {
    title: '银河帝国',
    describe: '2024.1 管弦乐编曲，铜管声音需要处理',
    scale: '小调',
    timeSignature: '4/4',
  },
  {
    title: '这一刻，沧海桑田',
    describe: '2024.1 科幻风格电影的配乐，在库乐队中发现并采用了一些新的音色',
    scale: '小调',
    timeSignature: '4/4',
  },
]
</script>

<style scoped>

</style>