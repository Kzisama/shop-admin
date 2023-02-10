<template>
  <div class="my-header">
    <!-- logo -->
    <span class="logo">
      <el-icon class="mr-2">
        <Shop />
      </el-icon>
      超市管理系统
    </span>
    <!-- 功能按钮 -->
    <el-icon class="icon-btn" @click="menu.foldFn()">
      <Fold v-if="menu.isFold" />
      <Expand v-else />
    </el-icon>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefreshFn">
        <Refresh />
      </el-icon>
    </el-tooltip>
    <!-- 右侧用户名称 & 退出操作 -->
    <div class="ml-auto mr-6 flex items-center">
      <el-tooltip effect="dark" :content="!isFullscreen ? '全屏' : '退出全屏'" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-avatar :size="30" :src="user.userInfo.avatar" />
      <el-dropdown class="dropdown">
        <span class="flex items-center text-light-50">
          {{ user.userInfo.nickname ? user.userInfo.nickname : user.userInfo.username }}
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="formDrawerRef.open()">修改密码</el-dropdown-item>
            <el-dropdown-item @click="logoutFn">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 修改密码 -->
    <FormDrawer ref="formDrawerRef" title="修改密码" destroy-on-close @submit="onSubmit(formRef)">
      <el-form ref="formRef" :rules="rules" :model="form">
        <el-form-item prop="oldpassword">
          <el-input v-model="form.oldpassword" type="password" show-password placeholder="原密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" show-password placeholder="新密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="form.repassword" type="password" show-password placeholder="确认新密码">
          </el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { updatePasswordAPI, logoutAPI } from "@/api/user";
import type { FormInstance, FormRules } from "element-plus";
import mainStore from "@/store";
import { useElMessageBox, useNotification } from "@/composables/encapsulation";
import { removeToken } from "@/untils/token";
import { useFullscreen } from "@vueuse/core";
import FormDrawer from "@/components/FormDrawer.vue";

const { isFullscreen /* 全屏状态,默认false */, toggle /* 切换全屏 */ } = useFullscreen();
const router = useRouter();

const { user, menu } = mainStore();

// 退出登录
const logoutFn = () => { handleLogout(); };
// 刷新
const handleRefreshFn = () => { location.reload(); };
// 修改密码
const { formDrawerRef, formRef, form, rules, onSubmit } = handlePassword();



// 退出登录函数
async function handleLogout() {
  // ElMessageBox 返回的是一个promise对象
  await useElMessageBox("是否要退出登录", "退出登录", "warning");
  const res = await logoutAPI();
  if (res.code === 0) {
    removeToken();
    removeToken('tags');
    useNotification("退出登录成功", "success", "");
    router.replace("/login");
  } else {
    useNotification("退出登录失败", "error", "");
  }
}
// 修改密码函数
function handlePassword() {
  // 修改密码---按钮
  const formDrawerRef = ref();
  // 修改密码---提交表单
  const formRef = ref<FormInstance>();
  const form = reactive({
    // 表单
    oldpassword: "",
    password: "",
    repassword: "",
  });
  const pwdReg: RegExp = /^[a-zA-Z0-9_]{6,16}$/; // 密码正则,6~16位（数字、字母、下划线）
  const validatePass = (rule: any, value: any, callback: any) => {
    // 自定义验证--新密码
    if (!value) {
      return callback(new Error("请输入新密码"));
    } else if (!pwdReg.test(value)) {
      return callback(new Error("密码由6~16位数字、字母、下划线组成"));
    } else {
      if (value === form.oldpassword) {
        return callback(new Error("新密码不能和原密码一致"));
      }
    }
    callback();
  };
  const validatePass2 = (rule: any, value: any, callback: any) => {
    // 自定义验证-确认密码
    if (value === "") {
      return callback(new Error("请再次输入密码"));
    } else if (value !== form.password) {
      return callback(new Error("两次密码不一致"));
    } else {
      callback();
    }
  };
  const rules: FormRules = {
    // 验证规则
    oldpassword: [
      { required: true, message: "原密码不能为空", trigger: "blur" },
    ],
    password: [{ validator: validatePass, trigger: "blur" }],
    repassword: [{ validator: validatePass2, trigger: "blur" }],
  };
  const onSubmit = (formEl: FormInstance | undefined) => {
    // 更新密码
    if (!formEl) return;
    formEl.validate(async (valid) => {
      if (valid) {
        formDrawerRef.value.load();
        const res = await updatePasswordAPI(form);
        formDrawerRef.value.unload();
        const type = res.code !== 0 ? "error" : "success"; // 提示类型
        useNotification(res.msg, type, "");
        if (res.code === 0) {
          removeToken();
          router.replace("/login");
        }
      } else {
        console.log("error submit!");
        return false;
      }
    });
  };

  return {
    formDrawerRef,
    formRef,
    form,
    rules,
    onSubmit,
  };
}
</script>

<style scoped lang="less">
.my-header {
  height: 64px;
  z-index: 10;
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;

  .logo {
    width: 200px;
    @apply flex justify-center items-center text-xl font-thin;
  }

  .icon-btn {
    width: 40px;
    height: 40px;
    cursor: pointer;
    @apply flex justify-center items-center;

    &:hover {
      @apply bg-indigo-600;
    }
  }

  .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex items-center ml-2;
  }
}
</style>
