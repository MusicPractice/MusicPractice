<template>
  <div class="uppers">
    <h1>
      <NuxtLink to="/" class="text-orange-600">返回</NuxtLink>
      音乐区UP主推荐
    </h1>
    <table>
      <thead>
      <tr>
        <th>up名称</th>
        <th>软件使用</th>
        <th>标签</th>
        <th>性别</th>
        <th>链接</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="up in ups" :key="up.title">
        <td>{{ up.title }}</td>
        <td>{{ up.tool }}</td>
        <td>{{ up.tag }}</td>
        <td>{{ up.gender ? '♂' : '♀' }}</td>
        <td>{{ up.link }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import ups from "~/utils/ups";
</script>

<style scoped lang="scss">
.uppers {
  text-align: center;
  padding: 4rem 10rem 0 10rem;
  overflow: auto;

  h1 {
    margin-bottom: 3rem;

    a {
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
      border-radius: 1rem;
      text-decoration: none;
      transition: all 0.3s;
      margin-bottom: 0.5rem;

      p {
        line-height: 0.5rem;
      }

      .male, .female {
        background-color: gray;
      }

      .male {
        color: #41c9e1;
      }

      .female {
        color: hotpink;
      }

    }
  }
}
</style>
