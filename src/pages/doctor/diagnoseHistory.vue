<template>
  <div>
    <h1>{{patient.name}}的就诊记录</h1>

    <el-card>
      <el-table
        :data="diagnoses"
        style="width: 100% "
        stripe
        empty-text="此患者没有进行过就诊"
        height="350">
        <el-table-column
          prop="diagnoseTime"
          fixed="left"
          label="日期"
          sortable
          width="120">
        </el-table-column>
        <el-table-column
          prop="symptom"
          label="症状"
          width="180">
        </el-table-column>
        <el-table-column
          prop="test"
          label="化验结果"
          width="180">
        </el-table-column>
        <el-table-column
          prop="result"
          label="诊断"
          width="180">
        </el-table-column>
        <el-table-column
          label="处方"
          width="100">
          <template slot-scope="scope">
            <el-button v-if="diagnoses[scope.$index].recipe" type="text" @click="goRecipeInfo(scope.$index,scope.row)">
              查看处方
            </el-button>
            <el-button v-else type="text" disabled>没有处方</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div style="margin-top: 8px;display:flex;">
      <div style="flex:10"></div>
      <div style="flex:1; float:right">
        <el-button size="small" @click="nextStep" type="primary" plain>下一步<i class="el-icon-right"></i></el-button>
      </div>
    </div>

    <el-dialog v-if="showDialog==true" title="处方详情" :visible.sync="showDialog" width="70%" top="10px">
      <el-card class="content">
        <div style="text-align: center"><h2>处方签</h2></div>

        <div class="recipeLine">
          <div class="textLine"><b>姓名: </b> {{recipe.patient.name}}</div>
          <div class="textLine"><b>性别: </b> {{recipe.patient.sex}}</div>
          <div class="textLine"><b>年龄: </b> {{recipe.patient.age}}</div>
          <div class="textLine"><b>日期: </b> {{recipe.recipeTime}}</div>
        </div>

        <div class="recipeLine">
          <div class="textLine"><b>住址: </b> {{recipe.patient.address}}</div>
          <div class="textLine"><b>电话: </b> {{recipe.patient.phone}}</div>
        </div>
        <div class="recipeLine">
          <div class="textLine"><b>症状: </b> {{recipe.diagnose.symptom}}</div>
          <div class="textLine"><b>化验: </b> {{recipe.diagnose.test}}</div>
        </div>
        <div class="recipeLine">
          <div class="textLine"><b>诊断: </b> {{recipe.diagnose.result}}</div>
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
      <span slot="footer" class="dialog-footer">
    <el-button @click="showDialog = false">关闭</el-button>
     </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        diagnoses: [],
        recipe: {},
        showDialog: false,
        recipeFlag: false
      }
    },
    computed: {
      patient() {
        return this.$store.state.targetPatient;
      }
    },
    methods: {
      nextStep() {
        this.$store.commit("nextStep");
      },
      goRecipeInfo(index, row) {
        axios.post("/data/recipe/getOne", {
          id: this.diagnoses[index].recipe.recipeId
        }).then((result) => {
          var res = result.data;
          this.recipe = res.result.recipeDatas;
          this.showDialog = true;
          this.recipeFlag = true;
        });
      }
    },
    mounted() {
      axios.post("/data/patient/getOne", {
        id: this.$store.state.targetPatient.id
      }).then((result) => {
        var res = result.data;
        this.diagnoses = res.result.userData.diagnoses;
        if (this.diagnoses.length > 0) {
          axios.post("/data/recipe/getOne", {
            id: this.diagnoses[0].recipe.recipeId
          }).then((result) => {
            var res = result.data;
            this.recipe = res.result.recipeDatas;
          });
        }
        this.$store.commit("updatePatientDiagnose", res.result.userData.diagnoses);
      });

    }
  }
</script>

<style scoped>
  .textLine {
    padding: 10px 0;
    font-size: 16px;
    flex: 1;
  }

  .content {
    margin-top: 2px;
  }

  .recipeLine {
    width: 100%;
    display: flex
  }
</style>
