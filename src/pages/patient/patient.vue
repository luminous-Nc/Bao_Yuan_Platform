<template>
  <div>
    <el-row style="margin-bottom: 8px" type="flex" justify="left">
      <el-col :span="2">
        <el-button size="small" @click="back" plain icon="el-icon-back">返回</el-button>
      </el-col>

      <el-col :span="22">
        <div style="float:right">
          <el-input
            style="width: 170px;margin: 0 20px"
            v-model="key"
            size="small"
            clearable
            placeholder="按姓名或性别搜索">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button @click="addPatient" type="primary" size="small" icon="el-icon-plus" plain>添加</el-button>
          <el-button @click="fresh" type="success" size = "small"icon="el-icon-refresh" plain>刷新</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row v-for="patientListItem in patientListCollection" :key ="id" gutter="20" style="margin-bottom: 10px;">
      <el-col v-for="item in patientListItem" :key="item.name" :span="6">
        <el-card :body-style="{ padding: '8px' }">
          <el-row type="flex" justify="center" >
            <el-col :span="4"></el-col>
            <el-col :span="16"><img v-if="item.sex=='男'" src="@/assets/man.png" style="width:100%;height:100%"></img>
              <img v-else src="@/assets/woman.png" style="width:100%;height:100%"></img></el-col>
            <el-col :span="4"></el-col>
          </el-row>
        <div style="text-align:center;margin-bottom:5px">{{item.name}}</div>
        <el-row gutter="8" type="flex" justify="center">
          <el-button @click="goPatientInfo(item)" size="mini" type="info" plain icon="el-icon-reading" circle></el-button>
          <el-button @click="editPatient(item)" size="mini" type="warning" plain icon="el-icon-edit-outline"
                     circle></el-button>
          <el-button @click="deletePatient(item)" size="mini" type="danger" plain icon="el-icon-delete"
                     circle></el-button>
        </el-row>
      </el-card>
    </el-col >
  </el-row>

    <el-dialog :title.sync="dialogHead" :visible.sync="showDialog" :close-on-click-modal="false">
      <el-form :model="tempPatient" :rules="rules" ref="dialogForm" style="width: 66%">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="tempPatient.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio-group v-model="tempPatient.sex">
            <el-radio label="男" clearable>男</el-radio>
            <el-radio label="女" clearable>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model.number="tempPatient.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="tempPatient.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model.number="tempPatient.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button v-if="dialogHead=='添加患者'" type="primary" @click="newSure('dialogForm')">确 定</el-button>
        <el-button v-if="dialogHead=='修改患者'" type="primary" @click="editSure('dialogForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios'
    export default {
      data() {
        return {
          patientList:[],
          tempPatient: {},
          orginalPatientList:[],
          patientListCollection:[],
          key:'',
          showDialog: false,
          formLabelWidth: '120px',
          dialogHead: '',
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
              {type: 'number', message: '联系方式必须是数字'}
            ]
          }
        }
      },mounted: function() {
        this.getPatientList();
      },methods:{
        dataForGraph() {
          this.patientListCollection = [];//初始化防止叠加
          var i = 0;
          var fourelements = [];
          while (i<this.patientList.length){
            if(i%4==0&&i!=0) {
              this.patientListCollection.push(fourelements)
              fourelements = [];
            }
            fourelements.push(this.patientList[i]);
            if(i==this.patientList.length-1){
              this.patientListCollection.push(fourelements)
              fourelements = [];//清不清无所谓但是还是清了吧
            }
            i++;
          }
        },
        getPatientList() {
          console.log("Now get medicine datas");
          axios.get("/data/patient/getAll", {}).then((result) => {
            var res = result.data;
            this.orginalPatientList = res.result.list;
            this.patientList = this.orginalPatientList;
            this.dataForGraph();
          })
        },
        fresh() {
          this.getPatientList();
        },
        goPatientInfo(item) {
          this.$router.push({path:'/pc/patient/'+item.id});
        },
        back() {
          this.$router.replace({path: '/pc/home'});
        },

        addPatient() {
          this.tempPatient = {};
          this.dialogHead = '添加患者';
          if (this.patientList.length > 0) {
            this.maxId = Math.max.apply(Math, this.patientList.map(function (o) {
              return o.id
            }));
            this.tempPatient.id = this.maxId + 1;
          } else {
            this.tempPatient.id = 10001;
          }
          this.showDialog = true;
        },
        editPatient(item) {
          this.dialogHead = '修改患者';
          this.tempPatient = JSON.parse(JSON.stringify(item));
          this.showDialog = true;
        },
        deletePatient(item) {
          this.$confirm(`确定要删除 ${item.name} 的信息吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.post("/delete/deletePatient", {
              _id: item._id
            }).then((result) => {
              var index = this.patientList.indexOf(item);
              this.getPatientList();
              this.$message({
                type: 'success',
                message: '删除成功'
              });
            });
          }).catch(() => {
          })
        },
        newSure(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              axios.post("/add/addPatient", {
                newpatient: this.tempPatient
              }).then((result) => {
                this.$message({
                  message: '患者' + this.tempPatient.name + '创建成功',
                  type: 'success'
                });
              });
              this.showDialog = false;
              this.fresh();
            } else {
              this.$message.error("有未填写或错误的字段")
            }
          })

        },
        editSure(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              axios.post("/change/changePatient", {
                patient: this.tempPatient
              }).then((result) => {
                this.$message({
                  message: '患者' + this.tempPatient.name + '修改成功',
                  type: 'success'
                });
              });
              this.showDialog = false;
              this.fresh();
            } else {
              this.$message.error("有未填写或错误的字段")
            }
          })
        },
      },computed:{

      },watch: {
        key: function (newVal, oldVal) {
          this.patientList =
          this.orginalPatientList.filter(data=> !newVal || data.name.toLowerCase().includes(newVal.toLowerCase())
                                                        || data.sex.toLowerCase().includes(newVal.toLowerCase()));
          this.dataForGraph();
        }
      }

    }
</script>

<style scoped>

</style>
