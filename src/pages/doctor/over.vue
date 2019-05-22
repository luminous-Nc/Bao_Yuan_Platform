<template>
  <div>
    <h1>就诊完成 请查看处方</h1>
    <el-card class="content">

      <div style="text-align: center"><h2>处方签</h2></div>
      <div class="recipeLine">
        <div class="textLine"><b>姓名: </b> {{patient.name}}</div>
        <div class="textLine"><b>性别: </b> {{patient.sex}}</div>
        <div class="textLine"><b>年龄: </b> {{patient.age}}</div>
        <div class="textLine"><b>日期: </b> {{recipe.recipeTime}}</div>
      </div>

      <div class="recipeLine">
        <div class="textLine"><b>住址: </b> {{patient.address}}</div>
        <div class="textLine"><b>电话: </b> {{patient.phone}}</div>
      </div>
      <div class="recipeLine">
        <div class="textLine"><b>症状: </b> {{diagnose.symptom}}</div>
        <div class="textLine"><b>化验: </b> {{diagnose.test}}</div>
      </div>
      <div class="recipeLine">
        <div class="textLine"><b>诊断: </b> {{diagnose.result}}</div>
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
        <div class="textLine" style="margin-top: 5px"><b>应收金额: </b> {{recipe.money}} 元</div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "over",
    data() {
      return {
        patient: {},
        diagnose: {},
        recipe: {}
      }
    },
    methods: {
      updateDiagnose() {
        axios.post("/change/changeDiagnose", {
          diagnose: this.diagnose
        }).then((result) => {
          var res = result.data;
        });
      },
      updatePatient() {
        axios.post("/change/changePatient", {
          patient: this.patient
        }).then((result) => {
          var res = result.data;
        });
      }
    },
    mounted() {
      this.patient = this.$store.state.targetPatient;
      this.diagnose = this.$store.state.targetDiagnose;
      this.updatePatient();
      this.updateDiagnose();
      this.recipe = this.$store.state.targetRecipe;
    }
  }
</script>

<style scoped>
  .textLine {
    padding: 10px 0;
    font-size: 16px;
    flex: 1;
  }

  .textLine2 {
    padding: 10px 0;
    font-size: 16px;
    flex: 2;
  }

  .content {
    margin-top: 20px;
    width: 70%;
  }

  .recipeLine {
    width: 100%;
    display: flex
  }
</style>
