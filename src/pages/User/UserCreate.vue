<template>
  <el-row class="create-container">
    <el-col :span="6" :offset="2" class="left">
      <div>
        <div class="welcome">新增用户</div>
        <div class="text">超级管理员特有权限</div>
      </div>
    </el-col>
    <el-col :span="14" class="right">
      <div>
        <span class="h-[1px] w-30 bg-gray-200"></span>
        <span>添加新用户</span>
        <span class="h-[1px] w-30 bg-gray-200"></span>
      </div>
      <el-form
        ref="formRef"
        :rules="rules"
        :model="createForm"
        style="width: 60%"
      >
        <el-form-item prop="username">
          <el-input v-model="createForm.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            show-password
            v-model="createForm.password"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item prop="character">
          <el-select v-model="createForm.character" placeholder="分配职位">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.character"
              :value="item.character"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input v-model="createForm.nickname" placeholder="用户昵称" />
        </el-form-item>
        <el-form-item prop="tel">
          <el-input v-model="createForm.tel" placeholder="手机号" />
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="createForm.email" placeholder="邮箱" />
        </el-form-item>
        <el-form-item class="flex justify-between">
          <el-button type="primary" @click="onSubmit(formRef)" class="flex-1"
            >确定创建</el-button
          >
          <el-button @click="resetForm(formRef)" class="flex-1">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { FormInstance, FormRules } from "element-plus";
import { useNotification } from "@/composables/encapsulation";
import { createAPI, getRoleAPI } from "@/api/user";
import { Role } from "@/types";

const { formRef, createForm, options, rules, onSubmit, resetForm } =
  handleCreate();

// 创建新用户函数
function handleCreate() {
  const formRef = ref<FormInstance>();

  // 表单属性
  const createForm = reactive({
    username: "",
    password: "",
    character: "",
    nickname: "",
    tel: "",
    email: "",
  });

  // 下拉菜单选项
  const options = ref<Role[]>([]);

  onMounted(async () => {
    const res = await getRoleAPI();
    options.value = res.data;
  });

  const uname_pwdReg: RegExp = /^[a-zA-Z0-9_]{6,16}$/; // 用户名,密码正则,6~16位（数字、字母、下划线）
  const telReg: RegExp = /0?(13|14|15|18)[0-9]{9}/; // 手机号正则
  const emailReg: RegExp =
    /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/; // 邮箱正则

  // 自定义验证规则
  const validateUname_pwd = (rule: any, value: any, callback: any) => {
    // 自定义验证--用户名和密码
    if (!value) {
      return callback(new Error("请填写必要信息"));
    }
    if (value && !uname_pwdReg.test(value)) {
      return callback(new Error("必须由6~16位数字、字母、下划线组成"));
    }
    callback();
  };
  const validateNickname = (rule: any, value: any, callback: any) => {
    // 自定义验证--用户昵称
    if (value && value.length < 4) {
      return callback(new Error("用户昵称不得少于4个字符"));
    }
    callback();
  };
  const validateTel = (rule: any, value: any, callback: any) => {
    // 自定义验证--手机号
    if (value && !telReg.test(value)) {
      return callback(new Error("手机号格式有误"));
    }
    callback();
  };
  const validateEmail = (rule: any, value: any, callback: any) => {
    // 自定义验证--邮箱
    if (value && !emailReg.test(value)) {
      return callback(new Error("邮箱格式有误"));
    }
    callback();
  };

  // 验证规则
  const rules: FormRules = {
    username: [{ validator: validateUname_pwd, trigger: "blur" }],
    password: [{ validator: validateUname_pwd, trigger: "blur" }],
    character: [
      { required: true, message: "用户职位不能为空", trigger: "blur" },
    ],
    nickname: [{ validator: validateNickname, trigger: "blur" }],
    tel: [{ validator: validateTel, trigger: "blur" }],
    email: [{ validator: validateEmail, trigger: "blur" }],
  };

  const onSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (valid) => {
      if (!valid) {
        useNotification("请填写正确信息", "warning", "");
        return false;
      }
      const res = await createAPI(createForm);
      if (res.code === 0) {
        useNotification(res.msg, "success", "");
        // 重置表单
        formEl.resetFields();
      } else {
        useNotification("创建用户失败", "error", "");
      }
    });
  };

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
  };

  return {
    formRef,
    createForm,
    options,
    rules,
    onSubmit,
    resetForm,
  };
}
</script>

<style scoped lang="less">
.create-container {
  min-height: 500px;

  .left {
    @apply flex justify-center items-center bg-purple-200;

    .welcome {
      @apply text-xl font-bold;
    }
  }

  .right {
    @apply flex flex-col justify-center items-center bg-light-50;

    & > div {
      @apply flex justify-center items-center space-x-2 my-5 text-gray-500;
    }
  }
}
</style>
