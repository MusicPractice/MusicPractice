<script setup lang="ts">
const links = [
  { to: '/', title: '首页' },
  { to: '/sheetMusicPractice', title: '五线谱练习' },
  { to: '/listeningExercise', title: '听力训练' },
  { to: '/piano', title: '键盘弹钢琴' },
  { to: '/works', title: '个人音乐作品' },
  { to: '/uppers', title: '音乐区UP主推荐' },
  { to: '/timbre', title: '音色收集' },
  { to: '/chord', title: '和弦与和弦进行' },
  { to: '/transcribeMusic', title: '扒谱学习' },
  { to: '/about', title: '关于作者' }
]
</script>

<template>
  <div class="NavBar">
    <h1 class="text-2xl my-2">个人音乐作品展</h1>
    <template v-for="link in links" :key="link.to">
      <nuxt-link :to="link.to" >{{ link.title }}</nuxt-link>
    </template>
    <div class="bottom-wrapper">
      <p>分享个人创作的音乐作品 | 乐理学习笔记 | 您可以在此训练音乐能力</p>
      <p>站长油箱：littlefean at bitmountain dot top</p>
      <a href="https://beian.miit.gov.cn/" target="_blank"
        >冀ICP备2022004336号-3</a
      >
      <br />
      <a
        href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13010202003473"
        target="_blank"
        >冀公安网备 13010202003473</a
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.NavBar {
  width: 15%;
  background-color: #2b2d31;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  & > a {
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

  .bottom-wrapper {
    box-sizing: border-box;
    //background-color: #1e1e1e;
    background: linear-gradient(to bottom, #2b2d31, #1e1e1e);
    width: 100%;
    //height: 150px;
    position: absolute;
    bottom: 0;
    text-align: center;
    padding: 20px 10px;

    p {
      color: gray;
      font-size: 12px;
      line-height: 1.5em;
    }

    & > a {
      color: gray;
      text-decoration: none;
      line-height: 1.5em;
      font-size: 12px;
    }
  }
}
</style>
