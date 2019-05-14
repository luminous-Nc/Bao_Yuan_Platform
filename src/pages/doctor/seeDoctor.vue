<template>
  <div>
    <el-steps :active=step align-center>
      <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
    </el-steps>
    <div style="height: 400px">
      <find-patient v-if="step==0"></find-patient>
      <add-diagnose v-if="step==1"></add-diagnose>
      <add-recipe v-if="step==2"></add-recipe>
      <div v-if="step==3">都没啦</div>
    </div>

    <div style="margin-top: 8px;display:flex;">
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
  import findPatient from '@/pages/doctor/findPatient.vue'
  import addDiagnose from '@/pages/doctor/addDiagnose.vue'
  import addRecipe from '@/pages/doctor/addRecipe.vue'

  export default {
    name: "seeDoctor",
    data() {
      return {
        step: 0
      }
    }, components: {
      findPatient,
      addDiagnose,
      addRecipe
    }, methods: {
      lastStep() {
        if (this.step != 0) {
          this.step--;
        }
      },
      nextStep() {
        if (this.step != 3) {
          this.step++
        }
      }
    }
  }
</script>

<style scoped>

</style>
