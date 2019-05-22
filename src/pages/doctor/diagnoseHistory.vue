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
            <el-button v-else type="text" disabled>未开处方</el-button>
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
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        diagnoses: []
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
        this.$message.error(index + '   ' + row);
      }
    },
    mounted() {
      axios.post("/data/patient/getOne", {
        id: this.$store.state.targetPatient.id
      }).then((result) => {
        var res = result.data;
        this.diagnoses = res.result.userData.diagnoses;
        this.$store.commit("updatePatientDiagnose", res.result.userData.diagnoses);
      });
    }
  }
</script>

<style scoped>

</style>
