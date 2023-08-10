<template>
  <div class="NavBar">
    <h1>音乐训练</h1>
    <NuxtLink to="/">首页</NuxtLink>
    <NuxtLink to="/">五线谱练习</NuxtLink>
    <NuxtLink to="/">听力训练</NuxtLink>
    <NuxtLink to="/piano">键盘弹钢琴</NuxtLink>
    <NuxtLink to="/uppers">音乐区UP主推荐</NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.NavBar {
  width: 15%;
  background-color: #2b2d31;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #fff;
    font-size: 110%;
    width: 100%;
    height: 2.5rem;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;

    &:hover {
      background-color: #35373c;
    }
  }
}
</style>
