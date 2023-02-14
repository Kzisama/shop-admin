<template>
  <router-view #="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.fade-enter-active {
  animation: fadeIn;
  animation-duration: 1.5s;
}
</style>
