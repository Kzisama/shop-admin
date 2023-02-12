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
      <el-table v-loading="loading" :data="tableData" stripe style="width: 100%" height="480">
        <el-table-column prop="title" label="通知标题" />
        <el-table-column prop="pubtime" label="发布时间" />
        <el-table-column prop="publisher" label="发布者" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="examine(scope.row)">查看</el-button>
            <el-button type="danger" @click="del(scope.row)" v-if="user.userInfo.character === '超级管理员'">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 查看通知详情 -->
    <FormDrawer ref="formDrawerRef" title="通知详情" @submit="sure">
      <div class="bg-light-50 shadow-inner p-5 rounded">
        <el-row class="mb-3 text-xl font-bold">{{ noticeInfo.title }}</el-row>
        <el-row class="mb-3 text-sm text-gray-400">
          <el-row class="mr-5">{{ noticeInfo.publisher }}</el-row>
          <el-row>{{ noticeInfo.pubtime }}</el-row>
        </el-row>
        <el-row class="mb-5">{{ noticeInfo.content }}</el-row>
      </div>
    </FormDrawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { delNoticeAPI, getNoticeAPI } from "@/api/notice";
import mainStore from "@/store";
import moment from "moment";
import FormDrawer from "@/components/FormDrawer.vue";
import { useNotification } from "@/composables/encapsulation";

const { user } = mainStore();

interface Notice {
  noticeID: number;
  title: string;
  content: string;
  pubtime: string;
  publisher: string;
  status: number;
}

// 筛选通知
const { tableData, loading, choose } = handleChoose();
// 查看通知详情
const { formDrawerRef, noticeInfo, examine, sure } = handleExamine();
// 删除通知
const { del } = handleDelNotice();


// 筛选通知函数
function handleChoose() {
  const allNotice = ref<Notice[]>([]); // 全部通知
  const tableData = ref<Notice[]>([]); // 表格展示数据
  const loading = ref<boolean>(true);

  onMounted(async () => {
    loading.value = true;
    const res = await getNoticeAPI();
    console.log(res);
    // 处理发布日期
    res.data.forEach((item: Notice) => {
      item.pubtime = moment(item.pubtime).format("YYYY-MM-DD HH:mm:ss");
    });
    allNotice.value = res.data;
    tableData.value = allNotice.value;
    loading.value = false;
  });

  // 筛选通知
  const choose = (limit: string) => {
    switch (limit) {
      case "all":
        tableData.value = allNotice.value;
        break;
      case "today":
        tableData.value = allNotice.value.filter(item => {
          return moment(item.pubtime).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD");
        });
      default:
        break;
    }
  };

  return {
    tableData, choose, loading
  };
}

// 查看通知函数
function handleExamine() {
  const formDrawerRef = ref();
  const noticeInfo = ref<any>({});

  // 点击查看按钮
  const examine = (notice: Notice) => {
    formDrawerRef.value.open();
    noticeInfo.value = notice;
  };

  // 点击提交按钮
  const sure = () => {
    formDrawerRef.value.close();
  };

  return {
    formDrawerRef, noticeInfo, examine, sure
  };
}

// 删除通知（超级管理员权限）
function handleDelNotice() {
  const del = async (notice: Notice) => {
    if (user.userInfo.character === '超级管理员') {
      console.log(notice);
      const res = await delNoticeAPI(notice.noticeID);
      if (res.code === 0) {
        useNotification(res.msg, "success", "");
        location.reload();
      } else {
        useNotification("删除失败", "error", "");
      }
    }
  };
  return { del };
}

</script>

<style scoped lang="less">
.notice-contain {
  @apply p-5 bg-light-50 rounded;
}
</style>
