<template>
  <app-alert />
  <NavBar />
  <NuxtPage class="bg-zinc-700 text-stone-200" />
</template>

<script lang="ts" setup>
import NavBar from '~/components/specific/NavBar.vue';
import AppAlert from '~/components/specific/app-alert.vue';

const router = useRouter();
const token = useLocalStorage('token', '');

if (
  router.currentRoute.value.path.startsWith('/_inside') &&
  !token.value.startsWith('gh')
) {
  router.push('/');
}

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/_inside')) {
    if (token.value.startsWith('gh')) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});
</script>

<style lang="scss">
#__nuxt {
  width: 100vw;
  height: 100vh;
  display: flex;

  > :last-child {
    flex: 1;
  }

  input {
    background: transparent;
    border: solid 1px;
    border-radius: 5px;
    margin: 0 5px;
    padding: 2px;
  }

  select {
    background: transparent;
    margin: 4px;

    &:hover {
      background-color: transparent;
    }

    &:focus {
      background-color: transparent;
    }

    option {
      background: #3f3f46;

      &:hover {
        background-color: transparent;
      }
    }
  }
}

* {
  font-family: -apple-system, system-ui, sans-serif;

  &::selection {
    //background-color: #c5a381;
  }
}


table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 10px;
    text-align: center;
  }

  th {
    //background-color: #c5a381;
  }

  tr {
    &:nth-child(odd) {
      //background-color: #dcd8d8;
    }
  }
}
</style>
