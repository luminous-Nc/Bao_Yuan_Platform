<template>
  <div>
    <div v-if="pageType==0">
      <h1>新建患者</h1>
      <el-input v-model="patientProp.name" placeholder="姓名"></el-input>
      <el-radio v-model="patientProp.sex" label="男">男</el-radio>
      <el-radio v-model="patientProp.sex" label="女">女</el-radio>
      <el-input v-model="patientProp.age" placeholder="年龄"></el-input>
      <el-input v-model="patientProp.address" placeholder="住址"></el-input>
      <el-input v-model="patientProp.phone" placeholder="联系电话"></el-input>
    </div>

    <div v-if="pageType==1">
      <el-input v-model="key" placeholder="请输入姓名"></el-input>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "definePatient",
    props: {
      patientProp: Object,
      pageType: Number
    },
    data() {
      return {
        patientList: [],
        maxId: 3
      }
    },
    mounted() {
      axios.post("/data/patient/getAllInfo", {
        id: 'all'
      }).then((result) => {
        var res = result.data;
        this.patientList = res.result.list;
        if (this.pageType == 0) {
          this.maxId = Math.max.apply(Math, this.patientList.map(function (o) {
            return o.id
          }));
          this.patientProp.id = this.maxId + 1;
        }
      })
    }
  }
</script>

<style scoped>

</style>
