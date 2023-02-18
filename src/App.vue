<template>
  <el-scrollbar style="height: 100vh">
    <router-view></router-view>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import { logoutAPI } from '@/api/user'

window.addEventListener('beforeunload', async () => {
  await logoutAPI()
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', async () => {
    await logoutAPI()
  })
})
</script>

<style lang="less">
body {
  @apply bg-gray-100;
}

#nprogress .bar {
  background-color: #ffdee9;
  background-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%);
}
</style>
