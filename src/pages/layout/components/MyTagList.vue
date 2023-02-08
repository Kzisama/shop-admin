<template>
  <div class="my-tag-list" :style="{ left: menu.asideWidth }">
    <el-tabs v-model="activeTag" type="card" class="flex-1" style="min-width: 100px;" @tab-remove="removeTab"
      @tab-change="changeTab">
      <el-tab-pane v-for="item in tagList" :key="item.path" :closable="item.path !== '/'" :label="item.title"
        :name="item.path">
      </el-tab-pane>
    </el-tabs>

    <span class="tag-btn">
      <el-dropdown @command="closeFn">
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height: 44px;"></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import mainStore from '@/store';
import router from '@/router';
import { getToken, setToken } from '@/untils/token';

const route = useRoute();
const { menu } = mainStore();

const { activeTag, tagList, changeTab, removeTab, closeFn } = handleTags();

// 侦听tagList的变化 深度监听
watch(tagList, () => {
  setToken(JSON.stringify(tagList.value), 'tags');
}, {
  deep: true
});


// tagList的一系列操作
function handleTags() {
  const activeTag = ref(route.path); // 当前处于激活状态的tag

  const tagList = ref([ // 标签列表
    {
      title: '后台首页',
      path: '/',
    },
  ]);

  // 初始化tagList
  initTagList();

  // 路由更新前，添加tag
  onBeforeRouteUpdate((to, from) => {
    activeTag.value = to.path;
    // tag 信息
    const tag = {
      title: to.meta.title as string,
      path: to.path
    };
    if (tagList.value.findIndex(item => item.path === tag.path) === -1) {
      tagList.value.push(tag);
    }
  });

  // 初始化tagList函数
  function initTagList() {
    const tags = getToken('tags');
    if (tags) {
      tagList.value = JSON.parse(tags);
    }
  };

  // 点击tag跳转
  const changeTab = (tabPath: string) => {
    router.push(tabPath);
  };

  // 删除tag
  const removeTab = (targetPath: string) => {
    // console.log(targetPath);
    tagList.value = tagList.value.filter(item => item.path !== targetPath);
    router.push('/');
  };

  // 删除标签
  const closeFn = (action: string) => {
    const nowPath = route.path;
    switch (action) {
      case 'other':
        // 关闭其他
        tagList.value = tagList.value.filter(item => (item.path === nowPath || item.path === '/'));
        return;
      case 'all':
        // 关闭所有
        tagList.value = tagList.value.filter(item => item.path === '/');
        router.push('/');
        return;
    }
  };

  return {
    activeTag,
    tagList,
    changeTab,
    removeTab,
    closeFn
  };
}
</script>

<style scoped lang="less">
.my-tag-list {
  position: fixed;
  top: 64px;
  right: 0;
  height: 44px;
  @apply flex items-center bg-gray-100 px-2 rounded;

  .tag-btn {
    height: 32px;
    @apply flex justify-center items-center bg-white ml-auto rounded pl-1 pr-2;
  }

  :deep(.el-tabs__header) {
    @apply flex items-center mb-0 border-0;

    .el-tabs__nav-prev,
    .el-tabs__nav-next {
      height: 32px;
      line-height: 32px;
    }

    .is-disabled {
      cursor: not-allowed;
      @apply bg-gray-50;
    }
  }

  :deep(.el-tabs__nav) {
    @apply border-0;

    .el-tabs__item {
      height: 32px;
      line-height: 32px;
      @apply border-0 bg-white mx-1 rounded;
    }
  }

}
</style>

