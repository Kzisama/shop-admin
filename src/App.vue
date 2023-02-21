<template>
  <el-scrollbar style="height: 100vh">
    <router-view></router-view>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { logoutAPI } from '@/api/user'

const frontCloseTime = 'FrontCloseTime'

const beforeCloseFn = () => {
  localStorage.setItem(frontCloseTime, +new Date() + '')
}
const closedFn = async () => {
  const frontTime = parseInt(localStorage.getItem(frontCloseTime) as string)
  const gapTime = +new Date() - frontTime
  if (gapTime <= 5) {
    // 表示是关闭了页面
    await logoutAPI()
  } else {
    // 刷新页面
  }
}
onMounted(() => {
  window.addEventListener('beforeunload', beforeCloseFn)
  window.addEventListener('unload', closedFn)
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', beforeCloseFn)
  window.removeEventListener('unload', closedFn)
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
