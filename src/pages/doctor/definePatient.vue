<template>
  <div>

    <div v-if="pageType==0">
      <h1>登记新患者</h1>
      <el-form :model="patient" :rules="rules" ref="patientForm" label-position="left"
               label-width="80px" style="width: 60%;margin-top: 10px">
        <el-form-item label="姓名" autocomplete="off" prop="name">
          <el-input v-model="patient.name" placeholder="姓名" clearable></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="patient.sex">
            <el-radio label="男" clearable>男</el-radio>
            <el-radio label="女" clearable>女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="年龄" autocomplete="off" prop="age">
          <el-input v-model.number="patient.age" placeholder="年龄" clearable></el-input>
        </el-form-item>

        <el-form-item label="住址" autocomplete="off" prop="address">
          <el-input v-model="patient.address" placeholder="住址" clearable></el-input>
        </el-form-item>

        <el-form-item label="联系电话" autocomplete="off" prop="phone">
          <el-input v-model.number="patient.phone" placeholder="联系电话" clearable></el-input>
        </el-form-item>

      </el-form>
    </div>

    <div v-if="pageType==1">
      <h1>确定再诊患者</h1>
      <span>请输入患者名字     </span>
      <el-autocomplete
        class="inline-input"
        v-model="queryName"
        :fetch-suggestions="querySearch"
        placeholder="请输入患者名字"
        value-key="name"
        style="margin-top: 10px;"
        :trigger-on-focus="false"
        @select="selectPatient">

      </el-autocomplete>

      <el-card :body-style="{padding:'10px'}" style="margin-top:10px;width:60%">
        <div style="display:flex">
          <div style="flex:3;padding:20px">
            <img v-if="patient.sex=='男'" src="@/assets/man.png" style="width:100%;height:100%"></img>
            <img v-else src="@/assets/woman.png" style="width:100%;height:100%"></img>
          </div>
          <div style="flex:7;padding:0 20px;
        display:flex;flex-direction:column;justify-content:space-between">

            <div style="font-size: 18px; flex:1">姓名：{{patient.name}}</div>
            <div style="font-size: 18px;flex:1">性别：{{patient.sex}}</div>
            <div style="font-size: 18px;flex:1">年龄：{{patient.age}}</div>
            <div style="font-size: 18px;flex:1">电话：{{patient.phone}}</div>
            <div style="font-size: 18px;flex:1">地址：{{patient.address}}</div>
          </div>
        </div>
      </el-card>

    </div>

    <div style="margin-top: 8px;padding:0 30px;display:flex;">
      <div style="flex:10"></div>
      <div style="flex:1; float:right">
        <el-button size="small" @click="nextStep('patientForm')" type="primary" plain>下一步<i class="el-icon-right"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "definePatient",
    props: {
      pageType: Number,
    },
    data() {
      return {
        patient: {},
        patientList: [],
        maxId: 0,
        queryName: '',
        ifShowCard: false,
        rules: {
          name: [
            {required: true, message: '请输入患者姓名', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请选择用户性别', trigger: 'change'}
          ],
          age: [
            {type: 'number', message: '年龄必须是纯数字'}
          ],
          phone: [
            // {validator:checkPhone,trigger:'blur'}
            {type: 'number', message: '联系方式必须是数字'}
          ]
        }
      }
    },
    methods: {
      querySearch(key, cb) {
        let results = this.patientList.filter(data => data.name.toLowerCase().includes(key.toLowerCase()));
        cb(results);
      },
      selectPatient(item) {
        this.patient = item;
        this.ifShowCard = true;
      },
      nextStep(formName) {

        if (this.pageType == 0) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              axios.post("/add/addPatient", {
                newpatient: this.patient
              }).then((result) => {
                var res = result.data;
                this.patient['_id'] = res.result.createResult._id;
                this.$store.commit("updatePatient", this.patient);
                this.$store.commit("nextStep");
                this.$message({
                  message: '患者 ' + this.patient.name + ' 已成功注册!',
                  type: 'success'
                });
              });
            } else {
              this.$message.error("有未填写或错误的字段")
            }
          })

        }
        if (this.pageType == 1) {
          if (JSON.stringify(this.patient) == "{}") {
            this.$message.error("请确定患者");
          } else {
            this.$store.commit("updatePatient", this.patient);
            this.$store.commit("nextStep");
            this.$message({
              message: '已选择患者 ' + this.patient.name + ' !',
              type: 'success'
            });
          }
        }
      },
    },
    mounted() {
      this.patient = this.$store.state.targetDiagnose;
      axios.get("/data/patient/getAll", {}).then((result) => {
        var res = result.data;
        this.patientList = res.result.list;
        if (this.pageType == 0) {
          if (this.patientList.length > 0) {
            this.maxId = Math.max.apply(Math, this.patientList.map(function (o) {
              return o.id
            }));
            this.patient.id = this.maxId + 1;
          } else {
            this.patient.id = 10001;
          }
        }
      })
    }
  }
</script>

<style scoped>

</style>
