<template>
  <div class="user-contain">
    <!-- 头部筛选 -->
    <el-row class="flex items-center mb-5 text-sm">
      筛选用户：
      <el-select v-model="selectVal" @change="choose" placeholder="Select">
        <el-option
          v-for="item in userOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-row>
    <!-- 表格主体 -->
    <el-row>
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%"
        height="500"
      >
        <el-table-column label="用户">
          <template #default="scope">
            <div class="user">
              <el-avatar
                :size="35"
                :src="`${properties.$serveURL}${scope.row.avatar}`"
              />
              <div class="ml-2">
                <p class="text-base">{{ scope.row.username }}</p>
                <p class="text-xs text-gray-400">UID:{{ scope.row.userID }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="character" label="职位" />
        <el-table-column label="加入时间">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon>
                <timer />
              </el-icon>
              <span style="margin-left: 10px">{{ scope.row.createtime }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="当前状态">
          <template #default="scope">
            <el-tag type="success" plain v-if="scope.row.status === 1"
              >在线</el-tag
            >
            <el-tag type="info" plain v-else>离线</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="examine(scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 查看用户详情 -->
    <FormDrawer ref="formDrawerRef" title="用户详情" @submit="sure">
      <div class="bg-light-50 shadow-inner p-5 rounded">
        <!-- 头像部分 -->
        <el-row class="items-center mb-5">
          <el-avatar
            :size="45"
            :src="`${properties.$serveURL}${userInfo.avatar}`"
          ></el-avatar>
          <span class="text-gray-400 ml-3">{{ userInfo.nickname }}</span>
        </el-row>
        <!-- 详细信息部分 -->
        <el-row>
          <el-form label-width="70px" label-position="left">
            <el-form-item label="用户名">{{ userInfo.username }}</el-form-item>
            <el-form-item label="昵称">{{ userInfo.nickname }}</el-form-item>
            <el-form-item label="职位">
              <el-tag type="warning" plain>{{ userInfo.character }}</el-tag>
            </el-form-item>
            <el-form-item label="加入时间">{{
              userInfo.createtime
            }}</el-form-item>
            <el-form-item label="状态">
              <el-tag type="success" plain v-if="userInfo.status === 1"
                >在线</el-tag
              >
              <el-tag type="info" plain v-else>离线</el-tag>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElRow, ElTable, ElTableColumn, ElButton } from "element-plus";
import { UserInfo } from "@/types/index";
import { getUserInfoAllAPI } from "@/api/user";
import moment from "moment";
import { useGlobal } from "@/hooks/useGlobal";
import FormDrawer from "@/components/FormDrawer.vue";

const properties = useGlobal(); // 获取全局挂载的属性

// 筛选用户
const { tableData, loading, userOptions, selectVal, choose } = handleChoose();
// 查看通知详情
const { formDrawerRef, userInfo, examine, sure } = handleExamine();

// 筛选用户函数
function handleChoose() {
  const allUser = ref<UserInfo[]>([]); // 全部通知
  const tableData = ref<UserInfo[]>([]); // 表格展示数据
  const loading = ref<boolean>(true);
  const selectVal = ref("全部"); // 当前选中的筛选值
  const userOptions = [
    {
      value: "全部",
      label: "全部",
    },
    {
      value: "超级管理员",
      label: "超级管理员",
    },
    {
      value: "管理员",
      label: "管理员",
    },
    {
      value: "销售",
      label: "销售",
    },
  ];

  onMounted(async () => {
    loading.value = true;
    const res = await getUserInfoAllAPI();
    console.log(res);
    // 处理发布日期
    res.data.forEach((item: UserInfo) => {
      item.createtime = moment(item.createtime).format("YYYY-MM-DD HH:mm:ss");
    });
    allUser.value = res.data;
    tableData.value = allUser.value; // 默认显示全部用户信息
    loading.value = false;
  });

  // 筛选通知
  const choose = (val: string) => {
    console.log(val);
    if (val === "全部") {
      tableData.value = allUser.value;
    } else {
      tableData.value = allUser.value.filter((item) => item.character === val);
    }
  };

  return {
    tableData,
    loading,
    selectVal,
    userOptions,
    choose,
  };
}

// 查看用户函数
function handleExamine() {
  const formDrawerRef = ref();
  let userInfo = ref<UserInfo>({} as UserInfo);

  // 点击查看按钮
  const examine = (user: UserInfo) => {
    formDrawerRef.value.open();
    userInfo.value = user;
    console.log(userInfo);
  };

  // 点击提交按钮
  const sure = () => {
    formDrawerRef.value.close();
  };

  return {
    formDrawerRef,
    userInfo,
    examine,
    sure,
  };
}
</script>

<style scoped lang="less">
.user-contain {
  @apply p-5 bg-light-50 rounded;

  .user {
    @apply flex items-center;
  }
}
</style>
