<template>
  <div class="">
    <h1>个人创作的音乐作品</h1>
    <ul>
      <li v-for="work in works" :key="work.id">
        <NuxtLink :to="`/works/${work.id}/`">{{ work.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
useSeoMeta({
  title: '个人音乐作品展 | 个人音乐作品',
  description: '学习乐理，分享音乐作品和音乐区up主',
  keywords: '乐理学习, 音乐作品, 音乐区up主, 乐理笔记',
});

export default {
  data() {
    return {
      works: [
        {id: 1, title: '雪夜山谷'},
        {id: 2, title: '未来城市'},
        {id: 3, title: '中世纪的独木桥'},
        {id: 4, title: '暗夜花火'},
        {id: 5, title: '褐色回忆'},
        // 添加更多作品...
      ]
    }
  }
}
</script>

<style scoped>

</style>