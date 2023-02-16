<template>
  <div class="role-contain">
    <el-row>
      <el-button type="primary" @click="addCharacter" plain size="small">
        <el-icon><component is="Edit"></component></el-icon>
        新增
      </el-button>
    </el-row>
    <el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="character" label="职称" />
        <el-table-column prop="describe" label="描述" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              link
              size="small"
              v-if="scope.row.character !== '超级管理员'"
              @click="changeInfo(scope.row)"
            >
              修改信息
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              v-if="scope.row.character !== '超级管理员'"
              @click="changeRole(scope.row)"
            >
              配置权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <FormDrawer ref="formDrawerRefAdd" title="添加职位" @submit="submitForm(formAddRef)">
      <div class="bg-light-50 shadow-inner p-5 rounded">
        <el-form ref="formAddRef" :model="addForm" :rules="rules" label-position="left">
          <el-form-item label="职称" prop="character">
            <el-input v-model="addForm.character"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="describe">
            <el-input v-model="addForm.describe" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </FormDrawer>
    <FormDrawer
      ref="formDrawerRefChange"
      title="修改信息"
      @submit="submitChangeForm(formChangeRef)"
    >
      <div class="bg-light-50 shadow-inner p-5 rounded">
        <el-form ref="formChangeRef" :model="changeForm" :rules="changeRules" label-position="left">
          <el-form-item label="职称" prop="character">
            <el-input v-model="changeForm.character"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="describe">
            <el-input v-model="changeForm.describe" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </FormDrawer>
    <FormDrawer ref="formDrawerRefSet" title="配置权限" @submit="setRoles">
      <el-scrollbar>
        <el-tree
          ref="treeRef"
          :data="routerTree"
          :props="defaultProps"
          show-checkbox
          default-expand-all
          :render-after-expand="false"
        >
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span>
                <el-icon><component :is="data.icon"></component></el-icon>
                {{ node.label }}
              </span>
            </span>
          </template>
        </el-tree>
      </el-scrollbar>
    </FormDrawer>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from 'vue'
import {
  getAllRoutesAPI,
  getRoleAPI,
  addCharacterAPI,
  setCharacterAPI,
  setRolesAPI,
} from '@/api/user'
import { dataToTree } from '@/hooks'
import { ElTree, FormInstance, FormRules } from 'element-plus'
import FormDrawer from '@/components/FormDrawer.vue'
import { IRoute, Role } from '@/types'
import { useNotification } from '@/composables/encapsulation'

const tableData = ref<Role[]>([]) // 表格展示数据

onMounted(async () => {
  const res = await getRoleAPI()
  tableData.value = res.data
})

const { formDrawerRefAdd, addCharacter, formAddRef, addForm, rules, submitForm } =
  handleAddCharacter()

const {
  formDrawerRefChange,
  formChangeRef,
  changeForm,
  changeRules,
  changeInfo,
  submitChangeForm,
} = handleChangeInfo()

const { treeRef, formDrawerRefSet, changeRole, routerTree, defaultProps, setRoles } =
  handleChangeRole()

// 点击新增
function handleAddCharacter() {
  const formDrawerRefAdd = ref()
  const addCharacter = () => {
    formDrawerRefAdd.value.open()
  }

  const formAddRef = ref<FormInstance>()
  const addForm = reactive({
    character: '',
    describe: '',
  })
  const rules = reactive<FormRules>({
    character: [{ required: true, message: '请输入职称', trigger: 'blur' }],
    describe: [{ required: true, message: '请输入描述信息', trigger: 'blur' }],
  })
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
      if (!valid) {
        useNotification('请填写正确信息', 'warning', '')
        return false
      }
      const res = await addCharacterAPI(addForm)
      if (res.code === 0) {
        useNotification(res.msg, 'success', '')
        formEl.resetFields()
        formDrawerRefAdd.value.close()
        location.reload()
      } else {
        useNotification(res.msg, 'error', '')
        formEl.resetFields()
      }
    })
  }

  return {
    formDrawerRefAdd,
    addCharacter,
    formAddRef,
    addForm,
    rules,
    submitForm,
  }
}

// 点击修改信息
function handleChangeInfo() {
  const rowInfo = ref<Role | null>()

  const formDrawerRefChange = ref()
  const changeInfo = (row: Role) => {
    formDrawerRefChange.value.open()
    changeForm.character = row.character
    changeForm.describe = row.describe
    rowInfo.value = row
  }

  const formChangeRef = ref<FormInstance>()
  const changeForm = reactive({
    character: '',
    describe: '',
  })
  const changeRules = reactive<FormRules>({
    character: [{ required: true, message: '请输入职称', trigger: 'blur' }],
    describe: [{ required: true, message: '请输入描述信息', trigger: 'blur' }],
  })
  const submitChangeForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
      if (!valid) {
        useNotification('请填写正确信息', 'warning', '')
        return false
      }
      const res = await setCharacterAPI({
        ...changeForm,
        id: (rowInfo.value as Role).id,
      })
      if (res.code === 0) {
        useNotification(res.msg, 'success', '')
        formEl.resetFields()
        formDrawerRefChange.value.close()
        location.reload()
      } else {
        useNotification(res.msg, 'error', '')
        formEl.resetFields()
      }
    })
  }

  return {
    formDrawerRefChange,
    formChangeRef,
    changeForm,
    changeRules,
    changeInfo,
    submitChangeForm,
  }
}

// 点击配置权限
function handleChangeRole() {
  const rowInfo = ref<any>()

  const formDrawerRefSet = ref() // formDrawer实例
  const treeRef = ref<InstanceType<typeof ElTree>>() // 树形结构实例
  const routerTree = ref<IRoute[]>() // 树形结构信息
  const defaultProps = {
    // 树形结构配置
    label: 'title',
    children: 'children',
  }

  onMounted(async () => {
    const res = await getAllRoutesAPI()
    routerTree.value = dataToTree(res.data)
  })

  // 获取选中节点组成的数组
  const setRoles = async () => {
    // getCheckedNodes(arg1:boolean,arg2:boolean)
    // leafOnly, includeHalfChecked) 接收两个布尔类型参数: 1. 默认值为 false. 若参数为 true, 它将返回当前选中节点的子节点 2. 默认值为 false. 如果参数为 true, 返回值包含半选中节点数据
    const checkedRoles = treeRef.value!.getCheckedNodes(false, true)
    console.log(checkedRoles)
    const roles = checkedRoles.reduce((prev: any[], current: any) => {
      prev.push(current.routeID)
      return prev
    }, [])
    const res = await setRolesAPI({
      id: rowInfo.value.id,
      roles: JSON.stringify(roles),
    })
    if (res.code === 0) {
      useNotification(res.msg, 'success', '')
      formDrawerRefSet.value.close()
      location.reload()
    } else {
      useNotification(res.msg, 'error', '')
    }
  }

  const changeRole = (row: Role) => {
    formDrawerRefSet.value.open()
    rowInfo.value = row
    console.log(rowInfo.value)
  }

  return {
    treeRef,
    formDrawerRefSet,
    changeRole,
    routerTree,
    defaultProps,
    setRoles,
  }
}
</script>

<style scoped lang="less">
.role-contain {
  @apply p-5 bg-light-50;
}
</style>
