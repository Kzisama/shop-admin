<template>
  <div>
    <TableHeader>
      <el-button type="primary" size="small" @click="addDrawerRef.open()">新增</el-button>
      <el-button type="danger" size="small">删除</el-button>
    </TableHeader>
    <!-- 主体 -->
    <el-row>
      <el-table :data="goodsTable" style="width: 100%">
        <el-table-column fixed label="ID" width="150">
          <template #default="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="`${properties.$serveURL}${scope.row.pic}`"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="200" />
        <el-table-column prop="category" label="商品类别" />
        <el-table-column prop="price" label="价格" />
        <el-table-column prop="inventory" label="库存" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small">操作一</el-button>
            <el-button link type="primary" size="small">操作二</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 操作面板 -->
    <FormDrawer ref="addDrawerRef" title="添加商品" @submit="submit(addFormRef)">
      <el-form
        ref="addFormRef"
        :rules="rules"
        :model="addForm"
        label-position="left"
        label-width="90"
        style="width: 80%"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品种类" prop="category">
          <el-select v-model="addForm.category">
            <el-option
              v-for="item in categoryOptions"
              :key="item.categoryID"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品图">
          <el-upload
            :auto-upload="false"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-change="handleOnChange"
            :limit="1"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input type="number" v-model="addForm.price">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input type="number" v-model="addForm.inventory">
            <template #append>件</template>
          </el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { FormInstance, FormRules, UploadProps } from 'element-plus'
import TableHeader from '@/components/TableHeader.vue'
import FormDrawer from '@/components/FormDrawer.vue'
import { Category, Goods } from '@/types'
import { addGoodsAPI, getGoodsListAPI, getCategoryAPI } from '@/api/goods'
import { useNotification } from '@/composables/encapsulation'
import { useGlobal } from '@/hooks/useGlobal'

const properties = useGlobal() // 获取全局挂载的属性

const { goodsTable } = getGoodsList()
const {
  addDrawerRef,
  addFormRef,
  addForm,
  rules,
  categoryOptions,
  dialogImageUrl,
  dialogVisible,
  handleOnChange,
  handlePictureCardPreview,
  submit,
} = addGoods()

function getGoodsList() {
  const goodsTable = ref<Goods[]>([])

  onMounted(async () => {
    const res = await getGoodsListAPI()
    console.log(res)
    goodsTable.value = res.data
  })

  return { goodsTable }
}

function addGoods() {
  const addDrawerRef = ref()
  const addFormRef = ref()

  const categoryOptions = ref<Category[]>([])

  onMounted(async () => {
    const res = await getCategoryAPI()
    categoryOptions.value = res.data
  })

  const addForm = reactive<{ [key: string]: any }>({
    name: '',
    category: '',
    pic: null,
    price: 0,
    inventory: 0,
  })

  const rules: FormRules = {
    name: [{ required: true, message: '请填写商品名称', trigger: 'blur' }],
    category: [{ required: true, message: '请选择商品种类', trigger: 'blur' }],
  }

  // 添加图片
  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)
  const handleOnChange: UploadProps['onChange'] = (uploadFile) => {
    // 文件状态改变时的钩子,获取图片信息
    addForm.pic = uploadFile.raw
  }
  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
  }

  const submit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
      if (valid) {
        // 验证通过,创建一个FormData对象
        const fd = new FormData()
        for (let key in addForm) {
          fd.append(key, addForm[key])
        }
        const res = await addGoodsAPI(fd)
        console.log(res)
        if (res.code === 0) {
          useNotification(res.msg, 'success', '')
          formEl.resetFields()
        } else {
          useNotification(res.msg, 'error', '')
          formEl.resetFields()
        }
      } else {
        console.log('error submit!')
      }
    })
  }

  return {
    addDrawerRef,
    addForm,
    addFormRef,
    rules,
    categoryOptions,
    dialogImageUrl,
    dialogVisible,
    handleOnChange,
    handlePictureCardPreview,
    submit,
  }
}
</script>

<style scoped lang="less"></style>
