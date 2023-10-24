<template>
  <div class="Index">
    <h1>首页</h1>
    <div class="common">
      <p>艺术的存在本身，在一个高度内卷，充满焦虑不断变化的社会里面，恰恰会成为修复社会情绪的一剂良药</p>
      <p>人类科技再发达，人类自己探索艺术和美的内在需求一直会存在</p>
      <p class="end">——所长林超</p>
    </div>
    <p>此网站主要记录乐理学习笔记、方便编曲</p>
    <p>同时还提供了一些音乐学习和训练的小工具</p>
  </div>
</template>

<script setup lang="ts">
// import ContentPage from "~/components/ContentPage.vue";
console.log('index...');
const { data } = await useFetch('/api/hello');
console.log(data);
// export default {
//   components: {ContentPage}
// }
</script>

<style scoped lang="scss">
.Index {
  padding: 10px 30px;

  h1,
  h2,
  h3 {
    text-align: center;
  }

  .common {
    background-color: #1e1e1e;
    padding: 20px;
    font-size: 20px;
    border-radius: 20px;
    text-align: center;

    p {
      line-height: 1.5em;
      font-family: 'Times New Roman', Times, serif;
    }

  }
}
</style>
