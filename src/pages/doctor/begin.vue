<template>
  <div>
    <el-row style="margin-bottom: 8px" type="flex" justify="left">
      <el-col span="2">
        <el-button size="small" @click="back" plain icon="el-icon-back">返回</el-button>
      </el-col>

      <el-col span="22">

      </el-col>
    </el-row>
    <div style="margin:50px 50px;width:70%; display: flex">
      <el-card class="button_card">
        <div v-on:click="newPatient">
          <el-row type="flex" justify="center">
            <el-col span="6"></el-col>
            <el-col span="12">
              <img src="@/assets/first.png" style="width:100%;height:100%"></img>
            </el-col>
            <el-col span="6"></el-col>
          </el-row>
          <div style="text-align: center;font-size: 22px">初诊</div>
        </div>
      </el-card>

      <el-card class="button_card">
        <div v-on:click="oldPatient">
          <el-row type="flex" justify="center">
            <el-col span="6"></el-col>
            <el-col span="12">
              <img src="@/assets/second.png" style="width:100%;height:100%"></img>
            </el-col>
            <el-col span="6"></el-col>
          </el-row>
          <div style="text-align: center;font-size: 22px">续诊</div>
        </div>
      </el-card>

    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      back() {
        this.$router.replace('/pc/home');
      },
      newPatient(event) {
        this.step++;
        this.$router.push('/pc/seeDoctor/0');
        // if (event) {
        //   alert(event.target.tagName)
        // }
      },
      oldPatient(event) {
        this.step--;
        this.$router.push('/pc/seeDoctor/1');
        // if (event) {
        //   alert(event.target.tagName);
        // }
      }
    }
  }
</script>

<style scoped>
  .button_card {
    flex: 1;
    margin-left: 30px;
    padding: 10px;
  }
</style>
