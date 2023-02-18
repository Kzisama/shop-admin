<template>
  <div class="goods-contain">
    <el-row>
      <el-button type="primary" plain size="small" @click="dialog.open()">
        <el-icon>
          <component is="Edit"></component>
        </el-icon>
        新增
      </el-button>
      <el-link type="primary" class="ml-auto mr-5" @click.prevent="refreshFn">
        <el-icon>
          <Refresh />
        </el-icon>
      </el-link>
    </el-row>
    <el-row>
      <el-table :data="categoryData" style="width: 100%">
        <el-table-column fixed prop="categoryID" label="ID" width="150" />
        <el-table-column prop="name" label="类别" width="200" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status === 0">在售类</el-tag>
            <el-tag type="info" v-else>下架类</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="edit(scope.row)"
            >
              编辑
            </el-button>
            <el-button link type="primary" size="small" @click="del(scope.row)">
              下架
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <MyDialog
      ref="dialog"
      title="新增种类"
      @submit="submit(categoryFormRef)"
      @reset="closeFn(categoryFormRef)"
    >
      <el-form ref="categoryFormRef" :rules="rules" :model="categoryForm">
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="categoryForm.name"
            palceholder="名称"
            v-focus
          ></el-input>
        </el-form-item>
      </el-form>
    </MyDialog>
    <FormDrawer
      ref="drawerRef"
      title="修改类别"
      @submit="submitSet(categorySetFormRef)"
    >
      <div class="bg-light-50 shadow-inner p-5 rounded">
        <el-form
          ref="categorySetFormRef"
          :rules="rulesSet"
          :model="categorySetForm"
        >
          <el-form-item label="名称" prop="name">
            <el-input
              v-model="categorySetForm.name"
              palceholder="名称"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { useNotification } from '@/composables/encapsulation'
import MyDialog from '@/components/MyDialog.vue'
import FormDrawer from '@/components/FormDrawer.vue'
import {
  addCategoryAPI,
  delCategoryAPI,
  getCategoryAPI,
  setCategoryAPI,
} from '@/api/goods'
import { Category } from '@/types'

const { categoryData, refreshFn } = getCategory()
const { dialog, categoryFormRef, categoryForm, rules, submit, closeFn } =
  addCategory()
const {
  drawerRef,
  categorySetFormRef,
  categorySetForm,
  rulesSet,
  edit,
  submitSet,
} = setCategory()
const { del } = delCategory()

// 获取商品分类
function getCategory() {
  const categoryData = ref<Category[]>([])
  // 刷新
  const refreshFn = async () => {
    const res = await getCategoryAPI()
    categoryData.value = res.data
  }

  onMounted(() => {
    refreshFn()
  })

  return { categoryData, refreshFn }
}

// 添加商品种类事件
function addCategory() {
  const dialog = ref() // dialog实例
  const categoryFormRef = ref() // 表单实例
  const categoryForm = reactive({
    name: '',
  })
  const rules = reactive<FormRules>({
    name: [{ required: true, message: '请填写种类名称', trigger: 'blur' }],
  })
  // 确定提交事件
  const submit = (formEl: FormInstance | undefined) => {
    if (!formEl) return false
    formEl.validate(async (valid) => {
      if (valid) {
        const res = await addCategoryAPI(categoryForm)
        if (res.code === 0) {
          useNotification(res.msg, 'success', '')
          formEl.resetFields()
          dialog.value.close()
        } else {
          useNotification(res.msg, 'error', '')
          formEl.resetFields()
        }
      }
    })
  }
  // 取消时的事件
  const closeFn = (formEl: FormInstance | undefined) => {
    if (!formEl) return dialog.value.close()
    formEl!.resetFields()
    dialog.value.close()
  }

  return { dialog, categoryFormRef, categoryForm, rules, submit, closeFn }
}

// 修改商品类别
function setCategory() {
  const drawerRef = ref()
  const categorySetFormRef = ref()
  const categorySetForm = reactive({
    categoryID: 0,
    name: '',
  })
  const rulesSet = reactive<FormRules>({
    name: [{ required: true, message: '请填写种类名称', trigger: 'blur' }],
  })

  const edit = (categoryInfo: Category) => {
    drawerRef.value.open()
    categorySetForm.categoryID = categoryInfo.categoryID
    categorySetForm.name = categoryInfo.name
  }

  const submitSet = (formEl: FormInstance | undefined) => {
    if (!formEl) return false
    formEl.validate(async (valid) => {
      if (valid) {
        const res = await setCategoryAPI(categorySetForm)
        if (res.code === 0) {
          useNotification(res.msg, 'success', '')
          formEl.resetFields()
          drawerRef.value.close()
        } else {
          useNotification(res.msg, 'error', '')
          formEl.resetFields()
        }
      } else {
        console.log('err')
      }
    })
  }

  return {
    drawerRef,
    categorySetFormRef,
    categorySetForm,
    rulesSet,
    edit,
    submitSet,
  }
}

// 下架商品类别
function delCategory() {
  const del = async (category: Category) => {
    const res = await delCategoryAPI({ categoryID: category.categoryID })
    console.log(res)

    if (res.code === 0) {
      useNotification(res.msg, 'success', '')
    } else {
      useNotification(res.msg, 'error', '')
    }
  }

  return { del }
}
</script>

<style scoped lang="less">
.goods-contain {
  @apply p-5 bg-light-50 rounded;
}
</style>
