<template>
  <div class="index">
    <h1>音乐训练</h1>
    <NuxtLink to="/">五线谱练习</NuxtLink>
    <NuxtLink to="/">听力训练</NuxtLink>
    <NuxtLink to="/">键盘弹钢琴</NuxtLink>
    <NuxtLink to="/uppers">音乐区UP主推荐</NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.index {
  text-align: center;
  padding-top: 10rem;

  a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;
    display: block;
    margin-bottom: 0.5rem;

    &:hover {
      color: #0ff;
    }
  }
}
</style>
