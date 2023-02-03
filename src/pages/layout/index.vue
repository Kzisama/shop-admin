<template>
  <div>后台首页 {{ store.state.user.username }}</div>
  <el-button @click="logout">退出登录</el-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { logoutAPI } from '@/api/manage';
import { useElMessageBox, useNotification } from '@/composables/encapsulation';
import { removeToken } from '@/untils/auth';

const router = useRouter();
const store = useStore();

const logout = () => {
  // ElMessageBox 返回的是一个promise对象
  useElMessageBox('是否要退出登录', '退出登录', '').then((res) => {
    logoutAPI().finally(() => {
      removeToken();
      useNotification('退出登录成功', 'success', '');
      store.commit('SET_USERINFO', {});
      router.replace('/login');
    });
  }).catch(err => {
    console.log('取消');
  });
};
</script>