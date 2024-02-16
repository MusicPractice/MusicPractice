<template>
  <div class="flex flex-col justify-center items-center">

    <article class="text-2xl text-blue-200 leading-loose tracking-widest text-center m-16">
      <p>艺术的存在本身</p>
      <p>在一个高度内卷</p>
      <p>充满焦虑不断变化的社会里面</p>
      <p>恰恰会成为修复社会情绪的一剂良药</p>
      <br/>
      <p>人类科技再发达</p>
      <p>人类自己探索艺术和美的内在需求一直会存在</p>
      <br/>

      <p class="end">by 所长林超</p>
    </article>

    <section class="tracking-widest text-center text-blue-200">
      <p>此网站主要记录乐理学习笔记、方便编曲</p>
      <p>同时还提供了一些音乐学习和训练的小工具</p>
    </section>

  </div>
</template>

<script setup lang="ts">
// import ContentPage from "~/components/ContentPage.vue";
console.log('index...');
const {data} = await useFetch('/api/hello');
console.log(data);
</script>

<style scoped lang="scss">
.Index {

  .common {
    padding: 20px;
    font-size: 20px;
    border-radius: 20px;
    text-align: center;
  }
}
</style>
