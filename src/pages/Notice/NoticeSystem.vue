<template>
  <div class="notice-contain">
    <!-- 筛选 -->
    <el-row>
      <el-dropdown size="small" split-button type="primary">
        筛选通知
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="choose('all')">全部</el-dropdown-item>
            <el-dropdown-item @click="choose('today')">今日</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-row>
    <!-- 表格主体 -->
    <el-row class="my-5">
      <el-table :data="tableData" stripe style="width: 100%" height="480">
        <el-table-column prop="title" label="通知标题" />
        <el-table-column prop="pubtime" label="发布时间" />
        <el-table-column prop="publisher" label="发布者" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="examine(scope.row)">查看</el-button>
            <el-button type="danger" v-if="user.userInfo.character === '超级管理员'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getNoticeAPI } from "@/api/notice";
import mainStore from "@/store";
import moment from "moment";

const { user } = mainStore();

interface Notice {
  noticeID: number;
  title: string;
  content: string;
  pubtime: string;
  publisher: string;
}

const tableData = ref<Notice[]>([]); // 表格展示数据
const allNotice = ref<Notice[]>([]); // 全部通知

onMounted(async () => {
  const res = await getNoticeAPI();
  console.log(res);
  allNotice.value = res.data;
  tableData.value = allNotice.value;
});

// 筛选通知
const choose = (limit: string) => {
  switch (limit) {
    case "all":
      tableData.value = allNotice.value;
      console.log(tableData.value);
      break;
    case "today":
      tableData.value = allNotice.value.filter(item => {
        return moment(item.pubtime).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD");
      });
      console.log(tableData.value);
    default:
      break;
  }
};

// 查看通知
const examine = (notice: any) => {
  console.log(notice);
};
</script>

<style scoped lang="less">
.notice-contain {
  @apply p-5 bg-light-50 rounded;
}
</style>
