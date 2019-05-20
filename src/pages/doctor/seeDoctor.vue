<template>
  <div>
    <el-steps :active=step align-center finish-status="success">
      <el-step title="步骤1" description="确定患者"></el-step>
      <el-step title="步骤2" description="过往就诊记录"></el-step>
      <el-step title="步骤2" description="录入诊断信息"></el-step>
      <el-step title="步骤3" description="开具处方"></el-step>
      <el-step title="步骤4" description="完成"></el-step>
    </el-steps>
    <div style="height: 100% ;padding:0 30px">
      <define-patient v-if="step==0" :pageType=ifHasPatient></define-patient>
      <diagnose-history v-if="step==1"></diagnose-history>
      <add-diagnose v-if="step==2"></add-diagnose>
      <add-recipe v-if="step==3"></add-recipe>
      <div v-if="step==4">搞完了</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import diagnoseHistory from '@/pages/doctor/diagnoseHistory.vue'
  import addDiagnose from '@/pages/doctor/addDiagnose.vue'
  import addRecipe from '@/pages/doctor/addRecipe.vue'
  import definePatient from "@/pages/doctor/definePatient.vue";

  export default {
    name: "seeDoctor",
    data() {
      return {
        ifHasPatient: 0,
      }
    },
    computed: {
      patient() {
        return this.$store.state.targetPatient;
      },
      step() {
        return this.$store.state.step;
      },
    },
    components: {
      diagnoseHistory,
      addDiagnose,
      definePatient,
      addRecipe,
    }, methods: {

    }, mounted() {
      this.ifHasPatient = this.$route.params.ifHasPatient;

    }
  }
</script>

<style scoped>

</style>
