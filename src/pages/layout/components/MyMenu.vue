<template>
  <div class="my-menu" :style="{ width: menu.asideWidth }">
    <el-scrollbar>
      <el-menu
        class="border-0"
        :default-active="route.fullPath"
        :unique-opened="true"
        @select="selectFn"
        :collapse="!menu.isFold"
      >
        <template v-for="(item, index) in asideMenu" :key="index">
          <!-- 有二级菜单 -->
          <el-sub-menu
            v-if="item.children && item.children.length > 0"
            :index="item.name"
          >
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="(item2, index2) in item.children"
              :key="index2"
              :index="item2.link"
            >
              <el-icon>
                <component :is="item2.icon"></component>
              </el-icon>
              <span>{{ item2.title }}</span>
            </el-menu-item>
          </el-sub-menu>
          <!-- 没有二级菜单 -->
          <el-menu-item v-else :index="item.name">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import mainStore from "@/store";

const router = useRouter();
const route = useRoute();
const { menu, menuRoute } = mainStore();

// 树形结构
const asideMenu = menuRoute.routeTree;

// 路由跳转
const selectFn = (path: string) => {
  router.push(path);
};
</script>

<style scoped lang="less">
.my-menu {
  position: fixed;
  top: 64px;
  left: 0;
  bottom: 0;
  transition: all 0.3s;
  overflow-y: auto;
  overflow-x: hidden;
  @apply bg-light-50 shadow-md;
}
</style>
