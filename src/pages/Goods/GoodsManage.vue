<template>
  <div class="bg-light-50 p-5 rounded">
    <TableHeader @reload="reloadFn">
      <el-button type="primary" size="small" @click="addDrawerRef.open()">新增</el-button>
    </TableHeader>
    <el-row class="mb-2">
      <!-- 按名称筛选商品 -->
      <p class="flex items-center">
        <el-input
          v-model="searchName"
          placeholder="请输入商品名称"
          :suffix-icon="Search"
          @change="search"
        />
      </p>
    </el-row>
    <!-- 主体 -->
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed label="商品">
          <template #default="scope">
            <div class="flex">
              <el-image
                style="width: 100px; height: 100px"
                :src="`${properties.$serveURL}${scope.row.pic}`"
              ></el-image>
              <div class="flex flex-col justify-center ml-2">
                <p>{{ scope.row.name }}</p>
                <p class="text-gray-400 mt-1 text-sm">ID:{{ scope.row.goodsID }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="商品类别">
          <template #default="scope">
            <el-tag type="warning" plain>{{ scope.row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="上架状态">
          <template #default="scope">
            <el-tag type="success" plain v-if="scope.row.status === 0">上架</el-tag>
            <el-tag type="info" plain v-else>未上架</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格">
          <template #default="scope">
            <div class="text-red-500 text-lg">
              <span>￥</span>
              {{ scope.row.price.toFixed(2) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="inventory" label="库存(件)" />
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button link type="primary" @click="openSetDrawer(scope.row)">修改</el-button>
            <el-button link type="danger" @click="openDialog(scope.row)">上/下架</el-button>
            <el-button link type="danger" @click="openDialogDel(scope.row)">删除商品</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 添加商品 -->
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
    <!-- 修改商品信息 -->
    <FormDrawer ref="setDrawerRef" title="修改" @submit="submitSet(setFormRef)">
      <el-form
        ref="setFormRef"
        :rules="rulesSet"
        :model="setForm"
        label-position="left"
        label-width="90"
        style="width: 80%"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="setForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品种类" prop="category">
          <el-select v-model="setForm.category">
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
            :on-preview="handlePictureCardPreviewSet"
            :on-change="handleOnChangeSet"
            :limit="1"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="dialogVisibleSet">
            <img w-full :src="dialogImageUrlSet" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input type="number" v-model="setForm.price">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input type="number" v-model="setForm.inventory">
            <template #append>件</template>
          </el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
    <!-- 上架/下架商品 -->
    <MyDialog
      title="删除商品"
      ref="takeDialogRef"
      @submit="submitTakeOff"
      @reset="takeDialogRef.close()"
    >
      <div class="bg-light-50 shadow-inner p-5 rounded text-xl">
        确定{{ _goods.status === 0 ? '下架' : '上架' }}商品吗？
      </div>
    </MyDialog>
    <!-- 删除商品 -->
    <MyDialog title="删除商品" ref="delDialogRef" @submit="submitDel" @reset="delDialogRef.close()">
      <div class="bg-light-50 shadow-inner p-5 rounded text-xl">确定删除商品吗？</div>
    </MyDialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { FormInstance, FormRules, UploadProps } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import TableHeader from '@/components/TableHeader.vue'
import FormDrawer from '@/components/FormDrawer.vue'
import MyDialog from '@/components/MyDialog.vue'
import { Category, Goods } from '@/types'
import {
  addGoodsAPI,
  getGoodsListAPI,
  getCategoryAPI,
  setGoodsAPI,
  takeOffGoodsAPI,
  delGoodsAPI,
} from '@/api/goods'
import { useNotification } from '@/composables/encapsulation'
import { useGlobal } from '@/hooks/useGlobal'

const properties = useGlobal() // 获取全局挂载的属性
const tableData = ref<Goods[]>([]) // 表格展示的数据

// 获取商品列表
const { goodsList } = getGoodsList()
// 添加商品
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
// 修改商品
const {
  setDrawerRef,
  setForm,
  setFormRef,
  rulesSet,
  dialogImageUrlSet,
  dialogVisibleSet,
  openSetDrawer,
  handleOnChangeSet,
  handlePictureCardPreviewSet,
  submitSet,
} = setGoods()
// 上下架商品
const { takeDialogRef, _goods, openDialog, submitTakeOff } = takeOffGoods()
// 删除商品
const { delDialogRef, openDialogDel, submitDel } = delGoods()
// 按名称搜索商品
const { searchName, search } = searchByName()

// 获取商品
function getGoodsList() {
  const goodsList = ref<Goods[]>([]) // 全部商品数据

  onMounted(async () => {
    const res = await getGoodsListAPI()
    goodsList.value = res.data
    tableData.value = res.data
  })

  return { goodsList }
}
// 添加商品
function addGoods() {
  const addDrawerRef = ref()
  const addFormRef = ref()

  const categoryOptions = ref<Category[]>([])

  onMounted(async () => {
    const res = await getCategoryAPI()
    // 筛选出没有下架的类
    categoryOptions.value = res.data.filter((item: Category) => {
      return item.status === 0
    })
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
// 修改商品
function setGoods() {
  const setDrawerRef = ref()
  const setFormRef = ref()
  const setForm = reactive<{ [name: string]: any }>({})

  const openSetDrawer = (goods: Goods) => {
    setDrawerRef.value.open()
    // 将该行数据传递给form表单
    for (let key in goods) {
      setForm[key] = goods[key]
    }
    console.log(setForm)
  }

  const rulesSet: FormRules = {
    name: [{ required: true, message: '请填写商品名称', trigger: 'blur' }],
    category: [{ required: true, message: '请选择商品种类', trigger: 'blur' }],
  }

  const dialogImageUrlSet = ref('')
  const dialogVisibleSet = ref(false)
  const handleOnChangeSet: UploadProps['onChange'] = (uploadFile) => {
    // 文件状态改变时的钩子,获取图片信息
    setForm.pic = uploadFile.raw
  }
  const handlePictureCardPreviewSet: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisibleSet.value = true
  }

  const submitSet = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
      if (valid) {
        // 验证通过,创建一个FormData对象
        const fd = new FormData()
        for (let key in setForm) {
          fd.append(key, setForm[key])
        }
        const res = await setGoodsAPI(fd)
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
    setDrawerRef,
    setForm,
    setFormRef,
    rulesSet,
    dialogImageUrlSet,
    dialogVisibleSet,
    openSetDrawer,
    handleOnChangeSet,
    handlePictureCardPreviewSet,
    submitSet,
  }
}
// 上/下架商品
function takeOffGoods() {
  const takeDialogRef = ref()
  const _goods = reactive<{ [name: string]: any }>({})
  // 点击打开dialog
  const openDialog = (goods: Goods) => {
    console.log(goods)
    takeDialogRef.value.open()
    for (let key in goods) {
      _goods[key] = goods[key]
    }
  }
  const submitTakeOff = async () => {
    const obj: { goodsID: number; status: number } = {
      goodsID: _goods.goodsID,
      status: _goods.status === 0 ? 1 : 0,
    }
    const res = await takeOffGoodsAPI(obj)
    if (res.code === 0) {
      useNotification(res.msg, 'success', '')
      takeDialogRef.value.close()
    } else {
      useNotification(res.msg, 'error', '')
      takeDialogRef.value.close()
    }
  }

  return { takeDialogRef, _goods, openDialog, submitTakeOff }
}
// 删除商品
function delGoods() {
  const delDialogRef = ref()
  const _delGoods = reactive<{ [name: string]: number }>({})
  // 点击打开dialog
  const openDialogDel = (goods: Goods) => {
    delDialogRef.value.open()
    _delGoods.goodsID = goods.goodsID
  }
  const submitDel = async () => {
    const obj: { goodsID: number } = {
      goodsID: _delGoods.goodsID,
    }
    const res = await delGoodsAPI(obj)
    if (res.code === 0) {
      useNotification(res.msg, 'success', '')
      delDialogRef.value.close()
    } else {
      useNotification(res.msg, 'error', '')
      delDialogRef.value.close()
    }
  }

  return { delDialogRef, openDialogDel, submitDel }
}
// 按照名称搜索商品
function searchByName() {
  const searchName = ref<string>('')

  const search = () => {
    console.log(searchName)
    tableData.value = goodsList.value.filter((item) => {
      return item.name.indexOf(searchName.value) !== -1
    })
  }

  return { searchName, search }
}
// 刷新按钮操作
async function reloadFn() {
  searchName.value = ''
  const res = await getGoodsListAPI()
  goodsList.value = res.data
  tableData.value = res.data
}
</script>

<style scoped lang="less"></style>
