<script setup lang="ts">

interface NavItem {
  to: string;
  title: string;
  child?: NavItem[]
}

const links: Array<NavItem> = [
  {
    to: '/',
    title: '首页'
  },

  {
    to: '/practice-tools',
    title: '音乐练习工具',
    child: [
      {to: '/sheetMusicPractice', title: '五线谱练习'},
      {to: '/listeningExercise', title: '听力训练'},
    ]
  },
  {
    to: '/play',
    title: '音乐演奏',
    child: [
      {to: '/piano', title: '键盘弹钢琴'},
    ]
  },
  {
    to: '/producer-tools',
    title: '编曲学习',
    child: [
      {to: '/chord', title: '和弦'},
      {to: '/chordTransposed', title: '和弦转调'},
      {to: '/chordProgression', title: '和弦进行'},
      {to: '/transcribeMusic', title: '扒谱学习'},
      {to: '/timbre', title: '音色收集'},
    ]
  },
  {
    to: '/recommend',
    title: '音乐相关推荐',
    child: [
      {to: '/uppers', title: '音乐区UP主推荐'},
    ]
  },
  {
    to: '/works',
    title: '个人作品集'
  },
  {
    to: '/author',
    title: '关于作者',
  },
  {
    to: '/test',
    title: '测试',
  },
]
</script>

<template>
  <div class="w-48 bg-zinc-800 text-zinc-200 flex flex-col shadow-inner ring ring-blue-400 shadow-allogenes-deep relative">
    <h1 class="text-xl font-bold pl-2 py-4 mb-4">个人音乐小站</h1>
    <template v-for="link in links" :key="link.to">
      <section v-if="link.child"
               class="leading-8">
        <h2 class="pl-4 font-bold">{{ link.title }}</h2>
        <nuxt-link v-for="childLink in link.child"
                   :key="childLink.title"
                   :to="link.to + childLink.to"
                   class="pl-8 block text-zinc-300 hover:bg-zinc-600 transition">
          {{ childLink.title }}
        </nuxt-link>
      </section>
      <nuxt-link
          v-else
          :to="link.to"
          class="leading-8 pl-4 font-bold text-zinc-300">
        {{ link.title }}
      </nuxt-link>
    </template>

    <div
        class="bg-gradient-to-b from-zinc-800 to-zinc-950 text-zinc-500 absolute bottom-0 text-center p-2 text-xs leading-4">
      <p>分享个人创作的音乐作品 | 乐理学习笔记 | 您可以在此训练音乐能力</p>
      <p>站长油箱：littlefean at bitmountain dot top</p>
      <a href="https://beian.miit.gov.cn/" target="_blank"
      >冀ICP备2022004336号-3</a
      >
      <br/>
      <a
          href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13010202003473"
          target="_blank"
      >冀公安网备 13010202003473</a
      >
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
