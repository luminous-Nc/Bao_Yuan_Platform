<template>
  <el-header height="30" id="Top">
    <div class="headerRow">
      <div style="flex: 1">
        <el-button style="padding-left: 20px" class="headerButton" type="text">Bao Yuan Tang</el-button>
      </div>
      <div style="flex: 3">
        <bread-crumb style="height:100%"></bread-crumb>
      </div>
      <div style="flex: 1">
        <div style="float:right;padding-right:12px;width:88% ;display: flex">
          <el-col style="flex: 2">
            <el-button type="text" style="text-align:center;color: #eeeeee;font-size: 18px">{{username}}</el-button>
          </el-col>
          <el-col style="flex: 1"><el-button  type="text" style="color: #eeeeee;font-size: 18px">设置</el-button></el-col>
          <el-col style="flex: 1"><el-button  type="text" style="color: #eeeeee;font-size: 18px">帮助</el-button></el-col>
        </div>
      </div>
    </div>
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
    },
    computed: {
      username() {
        return this.$store.state.username;
      }
    }
  }
</script>

<style scoped>
  .headerRow{
    background: black;
    width:100%;
    display:flex
  }
  .headerButton{
    color: #eeeeee;
    font-family:Helvetica ;
    font-size:22px;
  }
  .el-header {
    padding:0
  }
</style>
