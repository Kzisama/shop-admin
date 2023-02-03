<template>
  <el-row class="login-container">
    <el-col :lg="16" :sm="12" class="left">
      <div>
        <div class="welcome">欢迎光临</div>
        <div class="text">超市管理后台 vue3 + vite</div>
      </div>
    </el-col>
    <el-col :lg="8" :sm="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>账号密码登录</span>
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div>
      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon class="el-input__icon">
                <user />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码">
            <template #prefix>
              <el-icon class="el-input__icon">
                <lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w-[250px]" round color="#626aef" :loading="loading" @click="onSubmit(formRef)">登 录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { setToken } from "@/untils/auth.js";
import { useNotification } from "@/composables/encapsulation";
import { loginAPI } from "@/api/manage.js";
import { Lock, User } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from 'element-plus'
import { AxiosResponse } from "axios";
import { from } from "rxjs";

const router = useRouter();
const loading = ref<boolean>(false);

const formRef = ref<FormInstance>();
// 表单
const form = reactive({
  username: "",
  password: ""
});
// 验证规则
const rules = {
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "用户名不能为空", trigger: "blur" }]
};
// 提交
const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) {
      useNotification("请填写完整信息", "warning", '');
      // 重置表单
      formEl.resetFields()
      return false;
    }
    loading.value = true; // 按钮处于加载状态
    loginAPI(form.username, form.password).then(res => {
      useNotification("登录成功", "success", '');
      // 保存token
      setToken(res.token);
      router.push("/");
    }).finally(() => {
      loading.value = false;
      // 重置表单
      formEl.resetFields()
    })
  });
};
</script>

<style lang="less" scoped>
.login-container {
  @apply min-h-screen bg-indigo-500;

  .left {
    @apply flex justify-center items-center;

    .welcome {
      @apply font-bold text-3xl text-light-50 mb-4;
    }

    .text {
      @apply text-gray-200 text-sm;
    }
  }

  .right {
    @apply bg-light-50 flex flex-col justify-center items-center;

    .title {
      @apply text-3xl font-bold text-gray-800;
    }

    &>div {
      @apply flex justify-center items-center space-x-2 my-5 text-gray-300;
    }
  }
}
</style>