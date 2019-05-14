<template>
  <div>
    <el-row style="margin-bottom: 8px" type="flex" justify="left">
      <el-col span="2"><el-button size="small" @click = "back" plain icon="el-icon-back">返回</el-button></el-col>

      <el-col span="22">
        <div style="float:right">
          <el-input
            style="width: 160px;margin-left: 10px"
            v-model="key"
            size="small"
            clearable
            placeholder="可搜索任意特征">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" size="small"  icon="el-icon-plus" plain>添加</el-button>
          <el-button @click="fresh" type="success" size = "small"icon="el-icon-refresh" plain>刷新</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row gutter="10">
      <el-col span="6">
        <el-card :body-style="{padding:'10px'}">
          <el-row type="flex" justify="center" >
            <el-col span="6"> </el-col>
            <el-col span="12"><img v-if="patient.sex=='男'" src="@/assets/man.png" style="width:100%;height:100%"></img>
              <img v-else src="@/assets/woman.png" style="width:100%;height:100%"></img>
            </el-col>
            <el-col span="6"></el-col>
          </el-row>
          <div style="text-align: center;font-size: 20px">{{patient.name}}</div>
          <div style="padding:10px; text-align:center;font-size: 14px">{{patient.sex}}    {{patient.age}}岁</div>
          <el-divider style="margin-bottom: 5px;margin-top: 5px"></el-divider>
          <div style="margin-left: 20px;margin-top:10px;font-size: 14px">
            <div class="info"><i class="el-icon-phone" ></i>{{patient.phone}}</div>
            <div class="info"><i class="el-icon-s-home"></i>{{patient.address}}</div>
          </div>
        </el-card >
      </el-col>
      <el-col span="18">
        <el-card>
          <el-table
            :data="diagnoses.filter(eachData=>!key
            || eachData.symptom.toLowerCase().includes(key.toLowerCase())
            || eachData.test.toLowerCase().includes(key.toLowerCase())
            || eachData.result.toLowerCase().includes(key.toLowerCase()))"
            style="width: 100% "
            stripe
            empty-text="此患者没有进行过就诊"
            height="480">
            <el-table-column
              prop="diagnoseTime"
              fixed="left"
              label="日期"
              sortable
              width="110">
            </el-table-column>
            <el-table-column
              prop="symptom"
              label="症状"
              sortable
              width="110">
            </el-table-column>
            <el-table-column
              prop="test"
              label="化验结果"
              sortable
              width="110">
            </el-table-column>
            <el-table-column
              prop="result"
              label="诊断"
              sortable
              width="110">
            </el-table-column>
            <el-table-column
              label="处方"
              width="100">
              <template slot-scope="scope">
                <el-button v-if="diagnoses[scope.$index].recipe" type="text" @click="goRecipeInfo(scope.$index,scope.row)">查看处方</el-button>
                <el-button v-else type="text" disabled>未开处方</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              header-align="center"
              align="center">
              <template slot-scope="scope">
                <el-button   size="mini"plain icon="el-icon-edit-outline" circle></el-button>
                <el-button   size="mini" type="danger" icon="el-icon-delete" plain circle ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios/index'
    export default {
        data(){
          return {
            patient:{},
            diagnoses:[],
            key:'',
            requestId:'',
          }
        },methods:{
          goRecipeInfo(index,row){
            this.$router.push({path:'/pc/recipe/'+this.diagnoses[index].recipe.recipeId})

          },
          getPatientInfo(requestId) {
          axios.post("/data/patient/getOneInfo", {
            id: requestId
          }).then((result) => {
            var res = result.data;
            this.patient = res.result.userData;
            this.diagnoses = this.patient.diagnoses;
          });
        },
          // let a;
          // for (a=0;a<this.diagnoses.length;a++{
          //   //a.diagnoseTime = a.diagnoseTime.format('yyyy-MM-dd');
          //   this.m = this.diagnoses[a].diagnoseTime.splice(10);
          // }

          back(){
            this.$router.replace({path:'/pc/patient'})
          },
        fresh(){
          this.requestId = this.$route.path.split('/')[3];
          this.getPatientInfo(this.requestId)
        }
      },mounted() {
          this.requestId = this.$route.path.split('/')[3];
          this.getPatientInfo(this.requestId);

      }
    }
</script>

<style scoped>
  .info {margin-bottom: 10px;
          margin-right:10px}
  .el-icon-phone{margin-right: 10px}
  .el-icon-s-home{margin-right:10px}
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 10px 0;
  }
</style>
