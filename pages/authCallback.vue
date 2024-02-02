<template>
  <div :class="$style.center">
    <h1 v-if="ok">
      ✔ 你现在可以
      <nuxt-link to="/_inside">进入真正的主页</nuxt-link>
      了
    </h1>
    <h1 :class="$style.spin" v-else>正在登录</h1>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const token = useLocalStorage("token", "");
const ok = ref(false);

onMounted(() => {
  if (route.query.token) {
    token.value = route.query.token as string;
  }
  ok.value = true;
});
</script>

<style lang="scss" module>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.spin {
  @keyframes spin {
    0% {
      transform: rotateY(0deg) translateY(0px);
    }
    50% {
      transform: rotateY(360deg) translateY(-50px);
    }
    100% {
      transform: rotateY(0deg) translateY(0px);
    }
  }
  animation: spin 3s linear infinite;
  transform-style: preserve-3d;
}
</style>
