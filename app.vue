<template>
  <NavBar />
  <NuxtPage />
</template>

<script lang="ts" setup>
const router = useRouter();
const token = useLocalStorage("token", "");

if (
  router.currentRoute.value.path.startsWith("/_inside") &&
  !token.value.startsWith("gh")
) {
  router.push("/");
}

router.beforeEach((to, from, next) => {
  if (to.path.startsWith("/_inside")) {
    if (token.value.startsWith("gh")) {
      next();
    } else {
      next("/");
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
    background-color: #313338;
  }
}
* {
  color-scheme: dark;
  font-family: -apple-system, system-ui, sans-serif;
}
</style>
