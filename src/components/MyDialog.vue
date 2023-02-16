<template>
  <el-dialog v-model="showDialog" :title="title" width="30%" center>
    <span>
      <slot>内容</slot>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="reset">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  title: string
}>()

const emits = defineEmits(['submit', 'reset'])

const showDialog = ref<boolean>(false) // 显示状态

const submit = () => {
  emits('submit') // 向父组件派发事件
}
const reset = () => {
  emits('reset')
}
const open = () => {
  showDialog.value = true
}
const close = () => {
  showDialog.value = false
}

defineExpose({
  open,
  close,
  submit,
  reset,
})
</script>

<style scoped lang="less">
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
