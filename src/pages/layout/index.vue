<template>
  <el-container>
    <el-header>
      <MyHeader></MyHeader>
    </el-header>
    <el-container>
      <el-aside>
        <MyMenu></MyMenu>
      </el-aside>
      <el-main>
        <MyTagList></MyTagList>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import MyHeader from "./components/MyHeader.vue";
import MyMenu from "./components/MyMenu.vue";
import MyTagList from "./components/MyTagList.vue";

</script>