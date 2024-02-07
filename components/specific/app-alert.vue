<script setup lang="ts">
import {ref} from 'vue';

let showAlert = ref(false);
let message = ref('');

export function mpAlert(msg: string) {
  message.value = msg;
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 3000);
}
</script>

<template>
  <!--
    此组件需要塞入APP中一次。以后就可以用mpAlert调用显示弹窗了
  -->
  <div class="fixed left-0 top-0 size-0 z-50">
    <div v-if="showAlert" class="mp-alert">{{ message }}</div>
  </div>

</template>

<style scoped lang="scss">
.mp-alert {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 5px;
  z-index: 9999;
}
</style>