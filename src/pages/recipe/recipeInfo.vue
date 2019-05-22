<template>
<div>
  <el-row style="margin-bottom: 8px" type="flex" justify="left">
    <el-col span="2"><el-button size="small" @click = "back" plain icon="el-icon-back">返回</el-button></el-col>
    <el-col span="22">
      <div style="float:right">
        <el-button type="primary" size="small"  icon="el-icon-plus" plain>修改</el-button>
        <el-button @click="fresh" type="success" size = "small"icon="el-icon-refresh" plain>刷新</el-button>
      </div>
    </el-col>
  </el-row>
  <el-card class="content">
    <div style="text-align: center"><h2>处方签</h2></div>

      <div class="recipeLine">
        <div class="textLine"><b>姓名:   </b>  {{recipe.patient.name}}</div>
        <div class="textLine"><b>性别:   </b>  {{recipe.patient.sex}}</div>
         <div class="textLine"> <b>年龄:   </b>  {{recipe.patient.age}}    </div>
        <div class="textLine"><b>日期:   </b>  {{recipe.recipeTime}}</div>
      </div>

    <div class="recipeLine">
      <div class="textLine"><b>住址:   </b>  {{recipe.patient.address}}</div>
      <div class="textLine"><b>电话:   </b>  {{recipe.patient.phone}}</div>
    </div>
    <div class="recipeLine">
        <div class="textLine"><b>症状:   </b>  {{recipe.diagnose.symptom}}</div>
      <div class="textLine"><b>化验:   </b>  {{recipe.diagnose.test}}</div>
      </div>
  <div class="recipeLine">
    <div class="textLine"><b>诊断:   </b>  {{recipe.diagnose.result}}</div>
  </div>
    <div class="recipeLine">
      <h1>Rp.</h1>
    </div>


  <el-table
    :data="recipe.medicineList"
    border
    show-summary="true"
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
      width="140">
    </el-table-column>
    <el-table-column
      prop="num"
      label="数量"
      >
    </el-table-column>
    <el-table-column
      prop="totalPrice"
      label="小计"
    >
    </el-table-column>
  </el-table>
    <div class="recipeLine">
      <div class="textLine" style="margin-top: 5px"><b>应收金额:   </b>  {{recipe.money}} 元</div>

    </div>

  </el-card>
</div>
</template>

<script>
  import axios from 'axios/index'
    export default {
      data(){
        return{
          requestId:0,
          recipe:{},
          o:{}
        }
      },methods:{
        getRecipeOne(requestId) {
          axios.post("/data/recipe/getOne",{
            id:requestId
          }).then((result) => {
            var res = result.data;
            this.recipe = res.result.recipeDatas;
            if (this.recipe.diagnose == null) {
              this.$message.error("此处方的病历被删除了");
              this.recipe.diagnose = {
                symptom: '病历被删除',
                test: '病历被删除',
                result: '病历被删除'
              }
            }
          });
        },
        back(){
          this.$router.go(-1);
        }
      },mounted() {
        this.requestId = this.$route.path.split('/')[3];
        this.getRecipeOne(this.requestId);

      },
    }
</script>

<style scoped>
.textLine{
  padding: 10px 0;
  font-size: 16px;
  flex:1;
}

.textLine2{
  padding: 10px 0;
  font-size: 16px;
  flex:2;
}
  .content{
    margin-top: 20px;
    width: 70%;
  }

  .recipeLine {
    width:100%;display:flex
  }
</style>
