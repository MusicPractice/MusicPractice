<template>
  <div class="index">
    <h1>首页</h1>
    <p>内容正在完善中……</p>
  </div>
</template>

<script setup lang="ts">
// import ContentPage from "~/components/ContentPage.vue";
console.log('index...');
const {data} = await useFetch('/api/hello');
console.log(data);
// export default {
//   components: {ContentPage}
// }
</script>

<style scoped lang="scss">
h1, h2, h3 {
  text-align: center;
}
</style>
