<!-- 二次封装----Drawer抽屉组件 -->
<template>
  <el-drawer
    class="drawer"
    v-model="showDrawer"
    :title="title"
    :size="size"
    :close-on-click-modal="false"
    :destroy-on-close="destroyOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <el-scrollbar>
          <slot></slot>
        </el-scrollbar>
      </div>
      <div class="actions">
        <el-button type="primary" @click="submit" :loading="isLoading">
          {{ confimText }}
        </el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showDrawer = ref<boolean>(false)

const props = defineProps({
  title: String,
  size: {
    type: String,
    default: '45%',
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  confimText: {
    type: String,
    default: '提交',
  },
})

const emit = defineEmits(['submit'])

const open = () => {
  // 显示抽屉组件
  showDrawer.value = true
}
const close = () => {
  // 隐藏抽屉组件
  showDrawer.value = false
}
const submit = () => {
  // 按钮的事件（由父组件提供）
  emit('submit')
}

const isLoading = ref<boolean>(false) // 加载状态
const load = () => {
  isLoading.value = true
}
const unload = () => {
  isLoading.value = false
}

defineExpose({
  // 暴露给父组件
  open,
  close,
  load,
  unload,
})
</script>

<style scoped lang="less">
.formDrawer {
  position: relative;
  width: 100%;
  height: 100%;
  color: #000;

  .body {
    height: calc(100% - 50px);
    overflow-y: auto;
  }

  .actions {
    bottom: 0;
    height: 50px;
    @apply flex items-center;
  }
}
</style>
