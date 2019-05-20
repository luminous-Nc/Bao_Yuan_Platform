<template>
  <div>
    <h1>添加处方</h1>

    <span>请输入药品名称     </span>

    <el-autocomplete
      class="inline-input"
      v-model="queryName"
      :fetch-suggestions="querySearch"
      placeholder="请输入药品名称"
      value-key="name"
      style="margin-top: 10px;"
      :trigger-on-focus="false"
      @select="selectMedicine">

    </el-autocomplete>
    <span>名称：{{readyMedicine.name}}</span>
    <span>价格：{{readyMedicine.price}}</span>
    <span>库存：{{readyMedicine.num}}</span>

    <el-button @click="addMedicine">添加进处方</el-button>


    <el-form ref="recipeForm" label-width="100px">

      <el-form-item
        v-for="(medicine, index) in tempMedicineList"
        :label="'药品' + (index+1)"
        :key="medicine.medicine"
        :prop="'domains.' + index + '.value'"
        :rules="{
      required: true, message: '必须输入药品名', trigger: 'blur'
    }"
      >
        <el-input style="width: 200px" v-model="medicine.medicine"></el-input>
        <el-input-number style="width: 200px" v-model="medicine.num" :min="1" label="数量"></el-input-number>
        <el-button style="width: 100px" type="danger" @click.prevent="removeMedicine(medicine)">删除</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('recipeForm')">提交</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

  import axios from 'axios'

  export default {
    name: "addRecipe",
    data() {
      return {
        recipe: {},
        allMedicine: [],
        queryName: '',
        readyMedicine: {},
        recipeList: [],
        maxId: 0,
        tempMedicineList: []
      }
    },
    mounted() {

      axios.get("/data/medicine/info").then((result) => {
        var res = result.data;
        this.allMedicine = res.result.list;
      });

      axios.post("/data/recipe/getAll").then((result) => {
        var res = result.data;
        this.recipeList = res.result.recipeDatas;
        this.maxId = Math.max.apply(Math, this.recipeList.map(function (o) {
          return o.recipeId
        }));
        this.recipe.recipeId = this.maxId + 1;
      });

      let nowDate = new Date();
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1 < 10 ?
        "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
      let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
        .getDate();

      this.recipe.recipeTime = year + "-" + month + "-" + day;  // "2018-03-26"
      this.recipe.patient = this.$store.state.targetPatient._id;
      this.recipe.diagnose = this.$store.state.targetDiagnose._id;
      this.recipe.medicineList = []
    },

    methods: {
      querySearch(key, cb) {
        let results = this.allMedicine.filter(data => data.name.toLowerCase().includes(key.toLowerCase()));
        cb(results);
      },

      selectMedicine(item) {
        this.readyMedicine = item;
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      removeMedicine(item) {
        this.$message.error(item);
        var index = this.recipe.medicineList.indexOf(item)
        if (index !== -1) {
          this.recipe.medicineList.splice(index, 1)
        }
      },
      addMedicine() {
        this.$message.error("添加" + this.readyMedicine.name);
        this.tempMedicineList.push(this.readyMedicine);
      }
    }
  }
</script>

<style scoped>

</style>
