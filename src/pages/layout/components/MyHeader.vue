<template>
  <div class="my-header">
    <span class="logo">
      <el-icon class="mr-2">
        <Shop />
      </el-icon>
      超市管理系统
    </span>
    <el-icon class="icon-btn">
      <Fold />
    </el-icon>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh">
        <Refresh />
      </el-icon>
    </el-tooltip>
    <!-- 右侧用户头像 & 退出操作 -->
    <div class="ml-auto mr-6 flex items-center">
      <el-tooltip effect="dark" :content="!isFullscreen ? '全屏' : '退出全屏'" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown">
        <span class="flex items-center text-light-50">
          <el-avatar class="mr-2" :size="30" :src="user.userInfo.avatar" />
          {{ user.userInfo.username }}
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Shop, Fold, Refresh, FullScreen, ArrowDown, Aim } from "@element-plus/icons-vue";
import { userStore } from '@/store/userStore';
import { useElMessageBox, useNotification } from "@/composables/encapsulation";
import { removeToken } from "@/untils/token";
import { useFullscreen } from '@vueuse/core';

const { isFullscreen/* 全屏状态,默认false */, toggle/* 切换全屏 */ } = useFullscreen();
const router = useRouter();
const user = userStore();

// 退出登录
const logout = () => {
  // ElMessageBox 返回的是一个promise对象
  useElMessageBox("是否要退出登录", "退出登录", "warning").then((res) => {
    removeToken();
    useNotification("退出登录成功", "success", "");
    router.replace("/login");
  }).catch(err => {
    console.log("取消");
  });
};
// 刷新
const handleRefresh = () => { location.reload(); };
</script>

<style scoped lang="less">
.my-header {
  height: 64px;
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;

  .logo {
    width: 250px;
    @apply flex justify-center items-center text-xl font-thin;
  }

  .icon-btn {
    width: 40px;
    height: 40px;
    cursor: pointer;
    @apply flex justify-center items-center;

    &:hover {
      @apply bg-indigo-600;
    }
  }

  .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex items-center;
  }
}
</style>
