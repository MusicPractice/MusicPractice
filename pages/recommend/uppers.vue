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
interface Up {
  title: string;
  tool?: string;
  tag?: string;
  gender: boolean;
  link: string;
}

const ups: Up[] = [
  {
    title: '编曲创作 + 英雄联盟',
    tool: '库乐队',
    gender: false,
    link: 'https://space.bilibili.com/1855757743',
  },
  {
    title: '编曲创作',
    tool: '库乐队, FL',
    tag: '网易音乐人',
    gender: true,
    link: 'https://space.bilibili.com/474036685',
  },
  {
    title: '编曲创作',
    tool: '库乐队, Medly',
    gender: true,
    link: 'https://space.bilibili.com/540033005',
  },
  {
    title: '编曲创作',
    tool: '库乐队',
    gender: true,
    link: 'https://space.bilibili.com/1191202887',
  },
  {
    title: '编曲创作 + 游戏',
    tool: '库乐队',
    gender: true,
    link: 'https://space.bilibili.com/402631059',
  },
  {
    title: '编曲创作',
    tool: 'Medly',
    gender: false,
    link: 'https://space.bilibili.com/529207208',
  },
  {
    title: '编曲创作',
    tool: 'Medly',
    gender: true,
    link: 'https://space.bilibili.com/625811977',
  },
  {
    title: '编曲创作',
    tool: 'FL',
    tag: '网易音乐人',
    gender: true,
    link: 'https://space.bilibili.com/340420556',
  },
  {
    title: '编曲创作',
    tool: 'FL',
    gender: true,
    link: 'https://space.bilibili.com/581735259',
  },
  {
    title: '编曲创作',
    tool: 'Medly',
    gender: true,
    link: 'https://space.bilibili.com/548905372',
  },
  {
    title: 'MC音效创作',
    tool: 'AE',
    gender: true,
    link: 'https://space.bilibili.com/12724008',
  },
  {
    title: '专业流行音乐编曲',
    tool: 'Cubase',
    gender: true,
    link: 'https://space.bilibili.com/403624999',
  },
  {
    title: '配乐编曲',
    tool: 'Cubase',
    gender: true,
    link: 'https://space.bilibili.com/421012805',
  },
  {
    title: '交响音乐整活',
    gender: true,
    link: 'https://space.bilibili.com/311671229',
  },
  {
    title: '编曲创作 + 游戏',
    tool: '库乐队',
    gender: true,
    link: 'https://space.bilibili.com/306224116',
  },
  {
    title: '电影音乐',
    tool: '库乐队',
    gender: true,
    link: 'https://space.bilibili.com/3493111852436046',
  },
  {
    title: '钢琴音乐创作',
    tool: '五线谱',
    gender: true,
    link: 'https://space.bilibili.com/199443546',
  },
  {
    title: '赋格音乐',
    tool: 'LMMS',
    gender: true,
    link: 'https://space.bilibili.com/1412778627',
  },
  {
    title: '赋格音乐',
    tool: '?',
    gender: true,
    link: 'https://space.bilibili.com/11178954',
  },
  {
    title: '西方音乐转载',
    gender: false,
    link: 'https://space.bilibili.com/393587131',
  },
  {
    title: '五线谱',
    gender: true,
    link: 'https://space.bilibili.com/3493094045517827',
  },
  {
    title: '五线谱整活',
    gender: true,
    link: 'https://space.bilibili.com/3494370439333970',
  },
  {
    title: '五线谱整活',
    gender: true,
    link: 'https://space.bilibili.com/3493127690128130',
  },
  {
    title: '吉他演奏',
    tool: '吉他',
    gender: false,
    link: 'https://space.bilibili.com/70465247',
  },
  {
    title: '编曲教学',
    tool: 'StudioOne',
    gender: true,
    link: 'https://space.bilibili.com/606349341',
  },
];


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
