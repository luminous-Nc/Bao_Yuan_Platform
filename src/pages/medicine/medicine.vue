<template>
  <div>
    <el-row style="margin-bottom: 8px" type="flex" justify="left">
      <el-col span="2"><el-button size="small" @click = "back" plain icon="el-icon-back">返回</el-button></el-col>

      <el-col span="22">
        <div style="float:right">
          <el-input
            style="width: 160px;margin-left: 10px"
            v-model="key"
            size="small"
            clearable
            placeholder="按名称搜索">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" size="small"  icon="el-icon-plus" plain>添加</el-button>
          <el-button @click="fresh" type="success" size = "small"icon="el-icon-refresh" plain>刷新</el-button>
        </div>
      </el-col>
    </el-row>

    <el-table
      :data="medicineList.filter(eachData=>!key || eachData.name.toLowerCase().includes(key.toLowerCase()))"
      style="width: 100%"
      stripe
      height="460"
    >
      <el-table-column
      prop="name"
      fixed="left"
      label="名称"
      sortable
      width="140">
    </el-table-column>
      <el-table-column
        prop="medicineId"
        label="编号"
        sortable
        width="140">
      </el-table-column>

      <el-table-column
        prop="price"
        label="价格"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="num"
        label="库存"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        width="120"
        header-align="center"
      align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)"  plain icon="el-icon-edit-outline" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" plain circle ></el-button>
        </template>
      </el-table-column>
      <el-table-column
      header-align="right">
        <template slot="header" slot-scope="scope">

        </template>
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
  import axios from 'axios/index'
  export default {
    data() {
      return {
      medicineList:[],
      key:''}
    },
    mounted: function () {
      this.getMedicineList();
    },
    methods:{
      getMedicineList() {
        // var param = {
        //   page:this.page,
        //   pageSize:this.pageSize
        // }
        console.log("Now get medicine datas");
        axios.get("/data/medicine/info").then((result)=>{
          var res = result.data;
          this.medicineList = res.result.list;
        })
      },
      handleClick(row){
        console.log(row);
      },
      fresh(){
        this.getMedicineList();
      },
      back(){
        this.$router.replace({path: '/pc/home'})
      }
    },
    computed:{
      // searchMohu() { //模糊搜索 //监控search变量
      //   console.log(this.key);
      //   const searchKey = this.search;
      //   if (searchKey) {
      //     return this.medicineList.filter(data => {
      //       return Object.keys(data).some(key => {
      //         return String(data[key]).toLowerCase().indexOf(searchKey) >-1
      //       })
      //     })
      //   }
      //   return this.medicineList;
      // }
    }

  }
</script>

<style scoped>

</style>
