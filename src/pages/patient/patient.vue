<template>
  <div>
    <el-row style="margin-bottom: 8px" type="flex" justify="left">
      <el-col span="2"><el-button size="small" @click = "back" plain icon="el-icon-back">返回</el-button></el-col>

      <el-col span="22">
        <div style="float:right">
          <el-input
            style="width: 170px;margin-left: 10px"
            v-model="key"
            size="small"
            clearable
            placeholder="按姓名或性别搜索">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" size="small"  icon="el-icon-plus" plain>添加</el-button>
          <el-button @click="fresh" type="success" size = "small"icon="el-icon-refresh" plain>刷新</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row v-for="patientListItem in patientListCollection" :key ="id" gutter="20" style="margin-bottom: 10px;">
      <el-col v-for="item in patientListItem" :key="item.name" :span="6">
        <el-card :body-style="{ padding: '8px' }">
          <el-row type="flex" justify="center" >
            <el-col span="4"> </el-col>
            <el-col span="16"><img v-if="item.sex=='男'" src="@/assets/man.png" style="width:100%;height:100%"></img>
              <img v-else src="@/assets/woman.png" style="width:100%;height:100%"></img></el-col>
            <el-col span="4"></el-col>
          </el-row>
        <div style="text-align:center;margin-bottom:5px">{{item.name}}</div>
        <el-row gutter="8" type="flex" justify="center">
          <el-button @click="goPatientInfo(item)" size="mini" type="info" plain icon="el-icon-reading" circle></el-button>
          <el-button size="mini" type="warning" plain icon="el-icon-edit-outline" circle></el-button>
          <el-button size="mini" type="danger" plain icon="el-icon-delete" circle></el-button>
        </el-row>
      </el-card>
    </el-col >
  </el-row>
  </div>
</template>

<script>
  import axios from 'axios/index'
    export default {
      data() {
        return {
          patientList:[],
          orginalPatientList:[],
          patientListCollection:[],
          key:'',
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
          axios.post("/data/patient/getAllInfo",{
            id:'all'
          }).then((result)=>{
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
        back() {this.$router.replace({path:'/pc/home'});}
      },computed:{
        // a:function(){
        //   this.a = key;
        //   return
        //     this.a;
        //     // medicineList:this.medicineList.filter(data => !key || data.name.toLowerCase().includes(key.toLowerCase()))

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
