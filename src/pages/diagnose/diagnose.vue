<template>
  <div>
    <el-row style="margin-bottom: 8px" type="flex" justify="left">
      <el-col :span="2">
        <el-button size="small" @click="back" plain icon="el-icon-back">返回</el-button>
      </el-col>

      <el-col :span="22">
        <div style="float:right">
          <el-input
            style="width: 160px;margin: 0 20px"
            v-model="key"
            size="small"
            clearable
            placeholder="可搜索任意特征">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button @click="fresh" type="success" size = "small"icon="el-icon-refresh" plain>刷新</el-button>
        </div>
      </el-col>
    </el-row>

    <el-table
      :data="diagnoses.filter(eachData=>!key
            || eachData.symptom.toLowerCase().includes(key.toLowerCase())
            || eachData.patient.name.toLowerCase().includes(key.toLowerCase())
            || eachData.test.toLowerCase().includes(key.toLowerCase())
            || eachData.result.toLowerCase().includes(key.toLowerCase()))"
      style="width: 100%"
      stripe
      height="480">
      <el-table-column
        prop="diagnoseTime"
        fixed="left"
        label="日期"
        sortable
        width="110">
      </el-table-column>

      <el-table-column
        prop="patient.name"
        fixed="left"
        label="患者姓名"
        sortable
        width="110">
      </el-table-column>
      <el-table-column
        prop="symptom"
        label="症状"
        sortable
        width="140">
      </el-table-column>
      <el-table-column
        prop="test"
        label="化验结果"
        sortable
        width="140">
      </el-table-column>
      <el-table-column
        prop="result"
        label="诊断"
        sortable
        width="140">
      </el-table-column>
      <el-table-column
        label="处方"
        width="110">
        <template slot-scope="scope">
          <el-button v-if="diagnoses[scope.$index].recipe" type="text" @click="goRecipeInfo(scope.$index,scope.row)">查看处方</el-button>
          <el-button v-else type="text" disabled>未开处方</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="110"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <el-button @click="changeDiagnose(scope.$index)" size="mini" plain icon="el-icon-edit-outline"
                     circle></el-button>
          <el-button @click="deleteDiagnose(scope.$index)" size="mini" type="danger" icon="el-icon-delete" plain
                     circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改药品" :visible.sync="showDialog" :close-on-click-modal="false">
      <el-form :model="tempDiagnose" ref="dialogForm" style="width: 66%">
        <el-form-item label="症状" :label-width="formLabelWidth" prop="name">
          <el-input v-model="tempDiagnose.symptom" type="textarea" autosize clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="化验结果" :label-width="formLabelWidth" prop="price">
          <el-input v-model.number="tempDiagnose.test" type="textarea" autosize clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="诊断" :label-width="formLabelWidth" prop="num">
          <el-input v-model.number="tempDiagnose.result" type="textarea" autosize clearable
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="sure('dialogForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios/index'
  export default {
    data(){
      return {
        tempDiagnose: {},
        diagnoses:[],
        key:'',
        requestId:'',
        showDialog: false
      }
    },methods:{
      getDiagnoseAll() {
        axios.get("/data/diagnose/getAll").then((result) => {
          var res = result.data;
          this.diagnoses = res.result.diagnoseDatas;
        });
      },
      back(){
        this.$router.replace({path:'/pc/home'})
      },
      fresh(){
        this.getRecipeAll()
      },
      goRecipeInfo(index,row) {
        this.$router.push({path:'/pc/recipe/'+this.diagnoses[index].recipe.recipeId})
      },
      deleteDiagnose(index) {
        let id = this.diagnoses[index]._id;
        this.$confirm('确定要删除这次就诊记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post("/delete/deleteDiagnose", {
            id: id
          }).then((result) => {
            this.diagnoses.splice(index, 1);
            this.$message({
              type: 'success',
              message: '删除成功'
            });
          });
        }).catch(() => {
        })
      },
      changeDiagnose(index) {
        this.tempDiagnose = JSON.parse(JSON.stringify(this.diagnoses[index]));
        this.showDialog = true;
      },
      sure(formName) {
        axios.post('/change/changeDiagnose', {
          diagnose: this.tempDiagnose
        }).then((result) => {
          this.$message({
            message: `就诊记录已经修改`,
            type: 'success'
          });
        });
        this.getDiagnoseAll();
        this.showDialog = false;
      }
    },mounted() {
      this.getDiagnoseAll();
    },

  }
</script>

<style scoped>

</style>
