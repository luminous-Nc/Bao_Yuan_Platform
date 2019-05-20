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
      this.diagnose.patient = this.$store.state.targetPatient.id;
      let nowDate = new Date();
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1 < 10 ?
        "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
      let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
        .getDate();
      this.diagnose.diagnoseTime = year + "-" + month + "-" + day;  // "2018-03-26"

      axios.post("/data/diagnose/getAll").then((result) => {
        var res = result.data;
        this.diagnoseList = res.result.diagnoseDatas;
        this.maxId = Math.max.apply(Math, this.diagnoseList.map(function (o) {
          return o.diagnoseId
        }));
        this.diagnose.diagnoseId = this.maxId + 1;
      })
    },
    methods: {
      nextStep() {
        // axios.post("/add/addEmptyRecipe")
        // axios.post("/add/addDiagnose",{
        //   newDiagnose:this.diagnose
        // }).then((result)=> {
        //   var res = result.data;
        //   this.diagnose['_id'] = res.result.createResult._id;
        //   this.$store.commit("updateDiagnose",this.diagnose);
        //   this.$store.commit("nextStep");
        // })
        this.$message.error("下一步");
        this.$store.commit("updateDiagnose", this.diagnose);
        this.$store.commit("nextStep");

      }
      }
    }
</script>

<style scoped>

</style>
