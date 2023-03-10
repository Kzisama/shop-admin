<!-- 优惠券 -->
<template>
  <div class="coupon-active" v-if="coupon.isActive">
    <div class="title">{{ coupon.title }}</div>
    <div class="date">{{ coupon.startDate }} ~ {{ coupon.endDate }}</div>
  </div>
  <div class="coupon-deactive" v-else>
    <div class="title">{{ coupon.title }}</div>
    <div class="date">{{ coupon.startDate }} ~ {{ coupon.endDate }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  coupon: {
    isActive: boolean
    title: string
    startDate: string
    endDate: string
  }
}>()
</script>

<style scoped lang="less">
.coupon-active {
  background-color: #fff1f2;
  @apply p-3 rounded border border-dashed border-red-400;
  .title {
    @apply mb-1 text-red-400 font-bold;
  }
  .date {
    @apply text-sm text-red-400;
  }
}
.coupon-deactive {
  background-color: #f9fafb;
  @apply p-3 rounded border border-dashed border-gray-400;
  .title {
    @apply mb-1 text-gray-400 font-bold;
  }
  .date {
    @apply text-sm text-gray-400;
  }
}
</style>
