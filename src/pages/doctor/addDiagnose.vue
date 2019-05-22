<template>
  <div>
    <h1>录入诊断信息</h1>
    <el-form :model="diagnose" label-position="left"
             label-width="80px" style="width: 60%;margin-top: 10px">
      <el-form-item label="症状" autocomplete="off" prop="symptom">
        <el-input v-model="diagnose.symptom" type="textarea" autosize placeholder="症状" clearable></el-input>
      </el-form-item>

      <el-form-item label="化验结果" autocomplete="off" prop="test">
        <el-input type="textarea" autosize v-model.number="diagnose.test" placeholder="化验结果" clearable></el-input>
      </el-form-item>

      <el-form-item label="诊断" autocomplete="off" prop="result">
        <el-input type="textarea" autosize v-model="diagnose.result" placeholder="诊断" clearable></el-input>
      </el-form-item>

    </el-form>

    <div style="margin-top: 8px;padding:0 30px;display:flex;">
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
    name: "addDiagnose",
      data() {
        return {
          diagnose: {},
          diagnoseList: [],
          maxId: 0,
          queryName: '',
          ifShowCard: false,
          rules: {}
        }
      },
    mounted() {
      this.diagnose = this.$store.state.targetDiagnose;
      this.diagnose.patient = this.$store.state.targetPatient._id;
      let nowDate = new Date();
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1 < 10 ?
        "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
      let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
        .getDate();
      this.diagnose.diagnoseTime = year + "-" + month + "-" + day;  // "2018-03-26"

      axios.get("/data/diagnose/getAll").then((result) => {
        var res = result.data;
        this.diagnoseList = res.result.diagnoseDatas;
        if (this.diagnoseList.length > 0) {
          this.maxId = Math.max.apply(Math, this.diagnoseList.map(function (o) {
            return o.diagnoseId
          }));
          this.diagnose.diagnoseId = this.maxId + 1;
        } else {
          this.diagnose.diagnoseId = 100001;
        }
      })
    },
    methods: {
      nextStep() {
        axios.post("/add/addDiagnose", {  //先创建就诊记录
          newDiagnose: this.diagnose
        }).then((result) => {
          var res = result.data;
          this.diagnose['_id'] = res.result.createResult._id;
          this.$store.commit("updateDiagnose", this.diagnose);
          var tempPatient = this.$store.state.targetPatient;
          tempPatient.diagnoses.push(this.diagnose._id);
          this.$store.commit("updatePatient", tempPatient);
          //更新了diagnose后要把id添加进patient的diagnose数组里
          this.$store.commit("nextStep");
        });
        this.$message({
          message: '患者' + this.patient.name + '的就诊记录已经创建!',
          type: 'success'
        });
      }
      }
    }
</script>

<style scoped>

</style>
