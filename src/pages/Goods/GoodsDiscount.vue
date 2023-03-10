<template>
  <div>
    <TableHeader @reload="refreshFn">
      <el-button type="primary" plain size="small" @click="drawerRef.open()">新增</el-button>
    </TableHeader>
    <el-table :data="tableData" style="width: 100%" height="560px">
      <el-table-column label="优惠券名称" width="300">
        <template #default="scope">
          <Coupons :coupon="scope.row.coupon"></Coupons>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          {{ scope.row.term ? '领取中' : '已失效' }}
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="数量" />
      <el-table-column prop="used" label="已使用" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button link type="primary">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <FormDrawer ref="drawerRef" title="新增优惠券" @submit="submitFn">
      <el-form
        label-position="left"
        label-width="100px"
        :model="addCouponsForm"
        style="max-width: 460px"
      >
        <el-form-item label="名称">
          <el-input v-model="addCouponsForm.name" />
        </el-form-item>
        <el-form-item label="面值">
          <el-input v-model="addCouponsForm.par" />
        </el-form-item>
        <el-form-item label="发行数量">
          <el-input v-model="addCouponsForm.inv" />
        </el-form-item>
        <el-form-item label="有效日期">
          <div class="flex">
            <el-date-picker
              v-model="addCouponsForm.startDate"
              type="date"
              placeholder="Pick a day"
            />
            <el-date-picker v-model="addCouponsForm.endDate" type="date" placeholder="Pick a day" />
          </div>
        </el-form-item>
        <el-form-item label="说明">
          <el-input type="textarea" v-model="addCouponsForm.type" />
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Coupons from '@/components/Coupons.vue'
import TableHeader from '@/components/TableHeader.vue'
import FormDrawer from '@/components/FormDrawer.vue'

const tableData = [
  {
    coupon: {
      isActive: true,
      title: '优惠券',
      startDate: '2022.12.20',
      endDate: '2023.12.20',
    },
    term: false,
    quantity: 100,
    used: 2,
  },
  {
    coupon: {
      isActive: true,
      title: '优惠券',
      startDate: '2022.12.20',
      endDate: '2023.12.20',
    },
    term: false,
    quantity: 100,
    used: 2,
  },
  {
    coupon: {
      isActive: true,
      title: '优惠券',
      startDate: '2022.12.20',
      endDate: '2023.12.20',
    },
    term: false,
    quantity: 100,
    used: 2,
  },
  {
    coupon: {
      isActive: true,
      title: '优惠券',
      startDate: '2022.12.20',
      endDate: '2023.12.20',
    },
    term: false,
    quantity: 100,
    used: 2,
  },
  {
    coupon: {
      isActive: true,
      title: '优惠券',
      startDate: '2022.12.20',
      endDate: '2023.12.20',
    },
    term: false,
    quantity: 100,
    used: 2,
  },
  {
    coupon: {
      isActive: true,
      title: '优惠券',
      startDate: '2022.12.20',
      endDate: '2023.12.20',
    },
    term: false,
    quantity: 100,
    used: 2,
  },
  {
    coupon: {
      isActive: true,
      title: '优惠券',
      startDate: '2022.12.20',
      endDate: '2023.12.20',
    },
    term: false,
    quantity: 100,
    used: 2,
  },
  {
    coupon: {
      isActive: true,
      title: '优惠券',
      startDate: '2022.12.20',
      endDate: '2023.12.20',
    },
    term: false,
    quantity: 100,
    used: 2,
  },
  {
    coupon: {
      isActive: true,
      title: '优惠券',
      startDate: '2022.12.20',
      endDate: '2023.12.20',
    },
    term: false,
    quantity: 100,
    used: 2,
  },
  {
    coupon: {
      isActive: true,
      title: '优惠券',
      startDate: '2022.12.20',
      endDate: '2023.12.20',
    },
    term: false,
    quantity: 100,
    used: 2,
  },
  {
    coupon: {
      isActive: true,
      title: '优惠券',
      startDate: '2022.12.20',
      endDate: '2023.12.20',
    },
    term: false,
    quantity: 100,
    used: 2,
  },
  {
    coupon: {
      isActive: true,
      title: '优惠券',
      startDate: '2022.12.20',
      endDate: '2023.12.20',
    },
    term: false,
    quantity: 100,
    used: 2,
  },
]

const { drawerRef, addCouponsForm, submitFn } = addCoupons()

// 刷新表单
const refreshFn = () => {
  console.log(123)
}

// 获取优惠券表单数据
function getCoupons() {}

// 新增优惠券
function addCoupons() {
  const drawerRef = ref()
  const addCouponsForm = reactive({
    name: '',
    par: 0,
    inv: 0,
    startDate: '',
    endDate: '',
    type: '',
  })
  const submitFn = () => {
    console.log(addCouponsForm)
  }
  return { drawerRef, addCouponsForm, submitFn }
}
</script>

<style scoped lang="less"></style>
