<template>
  <el-container>
    <el-header>
      <MyHeader></MyHeader>
    </el-header>
    <el-container>
      <el-aside class="aside" :style="{ width: menu.asideWidth }">
        <MyMenu></MyMenu>
      </el-aside>
      <el-main class="main">
        <MyTagList></MyTagList>
        <div class="main-contain">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { menuStore } from "@/store/menuStore";
import MyHeader from "./components/MyHeader.vue";
import MyMenu from "./components/MyMenu.vue";
import MyTagList from "./components/MyTagList.vue";

const menu = menuStore();
</script>

<style scoped lange="less">
.aside {
  transition: all 0.3s;
}

.main {
  padding: 0;
  box-sizing: border-box;
  overflow: auto;
}

.main-contain {
  padding: 12px;
}
</style>
