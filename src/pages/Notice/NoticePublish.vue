<template>
  <el-row class="create-container">
    <el-col :span="14" :offset="4" class="right">
      <div>
        <span>发布通知</span>
      </div>
      <el-form ref="formRef" :label-width="100" :rules="rules" :model="createForm" style="width: 80%;">
        <el-form-item label="通知标题" prop="title">
          <el-input v-model="createForm.title" />
        </el-form-item>
        <el-form-item label="通知内容" prop="content">
          <el-input v-model="createForm.content" type="textarea" />
        </el-form-item>
        <el-form-item class=" flex justify-between mt-10">
          <el-button type="primary" @click="onSubmit(formRef)" class="flex-1">发布</el-button>
          <el-button @click="resetForm(formRef)" class="flex-1">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { useNotification } from '@/composables/encapsulation';
import { createAPI } from '@/api/user';
import { pubNoticeAPI } from '@/api/notice';

const { formRef, createForm, rules, onSubmit, resetForm } = handleCreate();


// 发布通知函数
function handleCreate() {
  const formRef = ref<FormInstance>();

  // 表单属性
  const createForm = reactive({
    title: '',
    content: ''
  });

  // 验证规则
  const rules: FormRules = {
    title: [{ required: true, message: "请填写通知标题", trigger: "blur" }],
    content: [{ required: true, message: "请填写通知内容", trigger: "blur" }],
  };

  const onSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async valid => {
      if (!valid) {
        useNotification("请填写完整信息", "warning", "");
        return false;
      }
      console.log(createForm);
      const res = await pubNoticeAPI(createForm);
      console.log(res);
      if (res.code === 0) {
        useNotification(res.msg, "success", "");
        formEl.resetFields();
      } else {
        useNotification("发布失败", "error", "");
      }
    });
  };

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
  };

  return {
    formRef, createForm, rules, onSubmit, resetForm
  };
}
</script>

<style scoped lang="less">
.create-container {
  min-height: 500px;

  .right {
    @apply flex flex-col items-center bg-light-50;

    &>div {
      @apply flex justify-center items-center space-x-2 my-5 text-gray-500;
    }

    :deep(.el-textarea__inner) {
      height: 250px;
      resize: none;
    }
  }
}
</style>