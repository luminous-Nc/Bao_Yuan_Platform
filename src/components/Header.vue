<template>
  <el-header :height="30" id="Top">
    <el-row >
      <el-col :span="5"><el-button class="headerButton" type="text">Bao Yuan Tang</el-button></el-col>
      <el-col :span="5"><bread-crumb></bread-crumb></el-col>
      <el-col :span="14">
        <el-row type="flex" justify="end">
          <el-col :span="2"><el-button  type="text" style="color: #eeeeee;font-size: 18px">设置</el-button></el-col>
          <el-col :span="2"><el-button  type="text" style="color: #eeeeee;font-size: 18px">帮助</el-button></el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
  import BreadCrumb from '@/components/BreadCrumb.vue'
  export default {
    data() {
      return {

      };
    },
    components:{
      BreadCrumb
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  #Top{
    background: black;
  }
  .headerButton{
    color: #eeeeee;
    font-family:Helvetica ;
    font-size:22px;
  }
</style>
