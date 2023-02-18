<template>
  <el-row class="flex items-center mb-3">
    <slot></slot>
    <el-link type="primary" class="ml-auto mr-5" @click.prevent="refresh">
      <el-icon>
        <Refresh />
      </el-icon>
    </el-link>
  </el-row>
</template>

<script setup lang="ts">
const emits = defineEmits(['reload'])

const refresh = () => {
  emits('reload')
}
</script>
