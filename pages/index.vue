<template>
  <div class="index">
    <h1>首页</h1>
    <p>内容正在完善中……</p>
  </div>
</template>

<script setup lang="ts">
console.log('index...');
const {data} = await useFetch('/api/hello');
console.log(data);
</script>

<style scoped lang="scss"></style>
