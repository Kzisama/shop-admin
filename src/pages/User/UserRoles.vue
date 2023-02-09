<template>
  <el-row class="roles-table">
    <el-col>顶部按钮栏</el-col>
    <el-col :span="24">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="用户信息" />
        <el-table-column prop="name" label="用户职位" />
        <el-table-column prop="address" label="创建时间" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="clickFn(scope)">
              Remove
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>

</template>

<script lang="ts" setup>
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];

const clickFn = (e: any) => {
  console.log(e.$index, e.row);

};
</script>

<style scoped lang="less">
.roles-table {
  min-width: 680px;
}
</style>