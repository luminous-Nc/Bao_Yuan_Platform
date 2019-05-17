<template>
  <div>
    <div v-if="pageType==0">
      <h1>新建患者</h1>
      <el-input v-model="patientProp.name" placeholder="姓名" clearable></el-input>
      <el-radio v-model="patientProp.sex" label="男" clearable>男</el-radio>
      <el-radio v-model="patientProp.sex" label="女" clearable>女</el-radio>
      <el-input v-model="patientProp.age" placeholder="年龄" clearable></el-input>
      <el-input v-model="patientProp.address" placeholder="住址" clearable></el-input>
      <el-input v-model="patientProp.phone" placeholder="联系电话" clearable></el-input>
    </div>

    <div v-if="pageType==1">
      <el-autocomplete
        class="inline-input"
        v-model="queryName"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        value-key="name"
        :trigger-on-focus="false"
        highlight-first-item
        @select="selectPatient">
      </el-autocomplete>
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
        maxId: 0,
        aaa: [],
        queryName: ''
      }
    },
    methods: {
      querySearch(key, cb) {
        let results = this.patientList.filter(data => data.name.toLowerCase().includes(key.toLowerCase()));
        this.aaa = results;
        cb(results);
      },
      selectPatient(item) {
        this.patientProp = item;
        // this.patientProp.name = item.name;
        // this.patientProp.sex = item.sex;
        // this.patientProp.age = item.age;
        // this.patientProp.id = item.id;
        // this.patientProp.phone = item.phone;
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
