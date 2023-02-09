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
        <span>个人信息</span>
        <span class="h-[1px] w-30 bg-gray-200"></span>
      </div>
      <el-form ref="formRef" label-position="left" label-width="100px" :rules="rules" :model="createForm"
        style="width: 80%;">
        <el-form-item label="用户名">
          <el-tag plain>{{ userInfo.username }}</el-tag>
        </el-form-item>
        <el-form-item label="用户职位">
          <el-tag type="warning" plain>{{ userInfo.character }}</el-tag>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="createTime" disabled />
        </el-form-item>
        <el-form-item prop="nickname" label="用户昵称">
          <el-input v-model="createForm.nickname" />
        </el-form-item>
        <el-form-item prop="tel" label="电话号码">
          <el-input v-model="createForm.tel" />
        </el-form-item>
        <el-form-item prop="email" label="邮箱地址">
          <el-input v-model="createForm.email" />
        </el-form-item>
        <el-form-item class="flex justify-between">
          <el-button type="primary" @click="onSubmit(formRef)" class="flex-1">确定修改</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { useNotification } from '@/composables/encapsulation';
import { updateUserInfoAPI } from '@/api/user';
import mainStore from '@/store';
import { storeToRefs } from 'pinia';
import moment from 'moment';

const { user } = mainStore();
const { userInfo } = storeToRefs(user);

const createTime = computed(() => {
  return moment(userInfo.value.createtime).format("YYYY-MM-DD");
});

const { formRef, createForm, rules, onSubmit } = handleCreate();


// 修改用户信息函数
function handleCreate() {
  const formRef = ref<FormInstance>();

  // 表单属性
  const createForm = reactive({
    nickname: userInfo.value.nickname,
    tel: userInfo.value.tel,
    email: userInfo.value.email
  });

  const telReg: RegExp = /^1[3-9]\d{9}$/; // 手机号正则
  const emailReg: RegExp = /^[0-9A-Za-z_]+([-+.][0-9A-Za-z_]+)*@[0-9A-Za-z_]+([-.][0-9A-Za-z_]+)*\.[0-9A-Za-z_]+([-.][0-9A-Za-z_]+)*$/; // 邮箱正则

  // 自定义验证规则
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
    nickname: [{ validator: validateNickname, trigger: "blur" }],
    tel: [{ validator: validateTel, trigger: "blur" }],
    email: [{ validator: validateEmail, trigger: "blur" }],
  };

  const onSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async valid => {
      if (!valid) {
        useNotification("请填写正确信息", "warning", "");
        formEl.resetFields(); // 重置表单
        return false;
      }
      console.log(createForm);
      const res = await updateUserInfoAPI(createForm);
      console.log(res);
      if (res.code === 0) {
        useNotification(res.msg, "success", "");
        location.reload();
      } else {
        useNotification("修改信息失败", "error", "");
      }
    });
  };

  return {
    formRef, createForm, rules, onSubmit
  };
}
</script>

<style scoped lang="less">
.create-container {
  min-width: 560px;
  min-height: 500px;

  .left {
    background-color: #D9AFD9;
    background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);
    @apply flex justify-center items-center;

    .welcome {
      @apply text-xl font-bold;
    }
  }

  .right {
    @apply flex flex-col justify-center items-center bg-light-50;

    &>div {
      @apply flex justify-center items-center space-x-2 my-5 text-gray-500;
    }
  }
}
</style>