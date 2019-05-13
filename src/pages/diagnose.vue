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
            placeholder="可搜索任意特征">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" size="small"  icon="el-icon-plus" plain>添加</el-button>
          <el-button @click="fresh" type="success" size = "small"icon="el-icon-refresh" plain>刷新</el-button>
        </div>
      </el-col>
    </el-row>

    <el-table
      :data="diagnoses.filter(eachData=>!key
            || eachData.symptom.toLowerCase().includes(key.toLowerCase())
            || eachData.patient.name.toLowerCase().includes(key.toLowerCase())
            || eachData.test.toLowerCase().includes(key.toLowerCase())
            || eachData.result.toLowerCase().includes(key.toLowerCase()))"
      style="width: 100%"
      stripe
      height="480">
      <el-table-column
        prop="diagnoseTime"
        fixed="left"
        label="日期"
        sortable
        width="110">
      </el-table-column>
      <el-table-column
        prop="patient.name"
        fixed="left"
        label="患者姓名"
        sortable
        width="110">
      </el-table-column>
      <el-table-column
        prop="symptom"
        label="症状"
        sortable
        width="140">
      </el-table-column>
      <el-table-column
        prop="test"
        label="化验结果"
        sortable
        width="140">
      </el-table-column>
      <el-table-column
        prop="result"
        label="诊断"
        sortable
        width="140">
      </el-table-column>
      <el-table-column
        label="处方"
        width="110">
        <template slot-scope="scope">
          <el-button v-if="diagnoses[scope.$index].recipe" type="text" @click="goRecipeInfo(scope.$index,scope.row)">查看处方</el-button>
          <el-button v-else type="text" disabled>未开处方</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="110"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <el-button   size="mini"plain icon="el-icon-edit-outline" circle></el-button>
          <el-button   size="mini" type="danger" icon="el-icon-delete" plain circle ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data(){
      return {
        diagnoses:[],
        key:'',
        requestId:'',
      }
    },methods:{
      getRecipeAll() {
        axios.post("/data/diagnose/getAll").then((result) => {
          var res = result.data;
          this.diagnoses = res.result.diagnoseDatas;
        });
      },
      back(){
        this.$router.replace({path:'/pc/home'})
      },
      fresh(){
        this.getRecipeAll()
      },
      goRecipeInfo(index,row) {
        this.$router.push({path:'/pc/recipe/'+this.diagnoses[index].recipe.recipeId})
      }
    },mounted() {
      this.getRecipeAll();
    },

  }
</script>

<style scoped>

</style>
