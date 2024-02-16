<template>
  <div class="About leading-loose p-4 overflow-auto">
    <h1 class="text-3xl leading-loose">关于作者</h1>
    <main>
      <h2 class="text-center text-xl leading-loose">网站开设</h2>
      <section class="text-center mb-4">
        <p>发现使用Cubase编曲时，还要低头看手写的笔记、使用ipad的库乐队进行编曲时，ipad里的笔记软件翻来翻去会比较麻烦</p>
        <p>开设一个网站专门记录编曲作品</p>
        <p>顺便收录一些其他人的作品、音乐人推荐的链接</p>
        <p>顺便再做一做音乐训练小工具，提升识谱能力、练习耳朵</p>
        <p>希望这个网站能对一些人有所帮助！</p>
      </section>


      <h2 class="text-center text-xl leading-loose">支持作者</h2>
      <section class="flex flex-col items-center mb-4">
        <p class="">如果你喜欢我的音乐类型，给我的作品点点红心、点点关注就是对我最大的帮助。</p>
        <nuxt-link class="bg-zinc-800 m-2 p-2 rounded" href="https://space.bilibili.com/82373947" target="_blank">
          音乐区up主主页 b站链接
        </nuxt-link>
        <nuxt-link class="bg-zinc-800 m-2 p-2 rounded" href="https://music.163.com/#/artist/album?id=55488458" target="_blank">
          网易云专辑列表链接
        </nuxt-link>
        <nuxt-link class="bg-zinc-800 m-2 p-2 rounded" href="https://www.kugou.com/singer/info/BLA1BK8BCE0DF6/" target="_blank">
          酷狗音乐人作品页
        </nuxt-link>
        <p class="">此外，up实际上也是程序开发者，如果你对编程也感兴趣，可以关注我的另一个编程up主账号：__阿岳__</p>
        <nuxt-link class="bg-zinc-800 m-2 p-2 rounded" href="https://space.bilibili.com/480804525" target="_blank">
          编程区up主主页 b站链接
        </nuxt-link>
        <nuxt-link class="bg-zinc-800 m-2 p-2 rounded" href="https://github.com/Littlefean" target="_blank">
          个人github主页
        </nuxt-link>
        <p class="text-center">微信号：qeszc79513</p>
      </section>

    </main>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: '个人音乐作品展 | 作者信息',
  description: '学习乐理，分享音乐作品和音乐区up主',
  keywords: '乐理学习, 音乐作品, 音乐区up主, 乐理笔记, littlefean, 小梵, 小梵littlefean, 网易音乐人小梵, 阿岳, __阿岳__, 阿岳同学',
});
</script>

<style lang="scss">
.About {
  h1 {
    text-align: center;
  }

  main {
    width: 90%;
    margin: 0 auto;
  }
}
</style>