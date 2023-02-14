<template>
  <el-scrollbar style="height: 100vh">
    <router-view></router-view>
  </el-scrollbar>
</template>

<script setup lang="ts"></script>

<style lang="less">
body {
  @apply bg-gray-100;
}

#nprogress .bar {
  background-color: #ffdee9;
  background-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%);
}
</style>
