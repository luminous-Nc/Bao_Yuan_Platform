<template>
  <el-menu
    :default-active="$route.path"
    theme="dark"
    menu-trigger="hover"
    background-color="#000000"
    text-color="#FFFFFF"
    active-text-color="#4FA5FE"
    router>
    <el-menu-item index="/pc/home">
      <i class="el-icon-menu"></i>
      <span slot="title">主页</span>
    </el-menu-item>
    <el-menu-item index="/pc/begin">
      <i class="el-icon-menu"></i>
      <span slot="title">接诊</span>
    </el-menu-item>
    <el-submenu>
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>患者</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/pc/patient">患者信息</el-menu-item>
        <el-menu-item index="/pc/diagnose">就诊信息</el-menu-item>
        <el-menu-item index="/pc/recipe">处方信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu>
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>药品</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/pc/medicine">药品信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item disabled>
      <i class="el-icon-document"></i>
      <span slot="title">米奇妙妙屋</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {

    },
    computed: {
    defaultActive() {
      return this.$route.path;
    }
    }
  }
</script>

<style scoped>
.el-menu{
  border-right-width:0px;
}
</style>
