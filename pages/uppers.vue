<template>
  <div class="uppers">
    <h1>
      <NuxtLink to="/">返回</NuxtLink>
      音乐区UP主推荐
    </h1>
    <div class="ups">
      <NuxtLink v-for="up in ups" :to="up.link" target="_blank">
        <h3>{{ up.title }}</h3>
        <p v-if="up.tool">软件使用：{{ up.tool }}</p>
        <p v-if="up.tag">标签：{{ up.tag }}</p>
        <p class="male" v-if="up.gender">♂</p>
        <p class="female" v-else>♀</p>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.uppers {
  text-align: center;
  padding: 4rem 10rem 0 10rem;
  overflow: auto;

  h1 {
    margin-bottom: 3rem;

    a {
      color: #3ec1e2;
      text-decoration: none;
    }
  }

  .ups {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;

    a {
      width: 17rem;
      height: 8rem;
      background-color: #222;
      border-radius: 1rem;
      color: #fff;
      text-decoration: none;
      transition: all 0.3s;
      margin-bottom: 0.5rem;

      p {
        line-height: 0.5rem;
      }

      .male {
        color: #41c9e1;
      }

      .female {
        color: hotpink;
      }

      &:hover {
        background-color: #333;
      }
    }
  }
}
</style>
