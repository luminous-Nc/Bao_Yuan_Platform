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
  <div class="content">
  <el-col class="textLine">姓名:  {{recipe.patient.name}}</el-col>
  <el-col class="textLine">性别:  {{recipe.patient.sex}}</el-col>
  <el-col class="textLine">年龄:  {{recipe.patient.age}}</el-col>
<!--  <el-col class="textLine">症状:  {{recipe.diagnose.symptom}}</el-col>-->
<!--  <el-col class="textLine">诊断:  {{recipe.patient.result}}</el-col>-->

  <el-table
    :data="recipe.medicineList"
    style="width: 60%"
    border
    empty-text="处方中没有药物"
    max-height="300">
    <el-table-column
      prop="medicine.name"
      fixed="left"
      label="药品名"
      width="160">
    </el-table-column>
    <el-table-column
      prop="medicine.price"
      label="单价"
      width="160">
    </el-table-column>
    <el-table-column
      prop="num"
      label="数量"
      >
    </el-table-column>
  </el-table>
  </div>
</div>
</template>

<script>
  import axios from 'axios'
    export default {
      data(){
        return{
          requestId:0,
          recipe:{}
        }
      },methods:{
        getRecipeOne(requestId) {
          axios.post("/data/recipe/getOne",{
            id:requestId
          }).then((result) => {
            var res = result.data;
            this.recipe = res.result.recipeDatas;
          });
        },
        back(){
          this.$router.go(-1);
        }
      },mounted() {
        this.requestId = this.$route.path.split('/')[3];
        this.getRecipeOne(this.requestId);
      }
    }
</script>

<style scoped>
.textLine{
  padding: 10px 0;
  font-size: 16px;
}
  .content{
    margin-left: 40px; margin-top: 40px;
  }
</style>
