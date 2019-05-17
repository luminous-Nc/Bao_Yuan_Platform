<template>
  <div>
    <el-steps :active=step align-center>
      <el-step title="步骤1" description="确定患者"></el-step>
      <el-step title="步骤2" description="确定诊断信息"></el-step>
      <el-step title="步骤3" description="开具处方"></el-step>
      <el-step title="步骤4" description="完成"></el-step>
    </el-steps>
    <div style="height: 100% ;padding:0 30px">
      <define-patient v-if="step==0" :patientProp=patient :pageType=ifHasPatient></define-patient>
      <add-diagnose v-if="step==1" :patientProp=patient></add-diagnose>
      <add-recipe v-if="step==2"></add-recipe>
      <div v-if="step==3">搞完了</div>
    </div>

    <div style="margin-top: 8px;padding:0 30px;display:flex;">
      <div style="flex:1">
        <el-button size="small" @click="lastStep" plain icon="el-icon-back">上一步</el-button>
      </div>

      <div style="flex:10"></div>

      <div style="flex:1; float:right">
        <el-button size="small" @click="nextStep" plain>下一步<i class="el-icon-right"></i></el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import addDiagnose from '@/pages/doctor/addDiagnose.vue'
  import addRecipe from '@/pages/doctor/addRecipe.vue'
  import definePatient from "@/pages/doctor/definePatient.vue";

  export default {
    name: "seeDoctor",
    data() {
      return {
        ifHasPatient: 0,
        step: 0,
        patient: {
          id: '',
          name: '',
          phone: '',
          address: '',
          age: '',
          sex: '',
          diagnose: [],
        },
        test: {},
      }
    }, components: {
      definePatient,
      addDiagnose,
      addRecipe,
    }, methods: {
      lastStep() {
        if (this.step != 0) {
          this.step--;
        }
      },
      nextStep() {
        if (this.step != 3) {
          if (this.step == 0 && this.ifHasPatient == 0) {
            this.createNewPatient();
          }
          this.step++
        }
      },


      createNewPatient() {
        axios.post("/add/addPatient", {
          newpatient: this.patient
        }).then((result) => {
          var res = result.data;
          this.patient = res.result.createResult;
          this.test = res.result.createResult;
          this.patient._id = res.result._id;
        });
      }

    }, mounted() {
      this.ifHasPatient = this.$route.params.ifHasPatient;

    }
  }
</script>

<style scoped>

</style>
