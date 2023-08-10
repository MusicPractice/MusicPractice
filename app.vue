<template>
  <NavBar />
  <NuxtPage />
</template>

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
