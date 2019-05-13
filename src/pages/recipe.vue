<template>
  <div>
    <el-row style="margin-bottom:10px" type="flex" justify="left">
      <el-col span="2"><el-button size="small" @click = "back" plain icon="el-icon-back">返回</el-button></el-col>

      <el-col span="22">
        <div style="float:right">
          <el-input
            style="width: 160px;margin-left: 10px"
            v-model="key"
            size="small"
            clearable
            placeholder="按日期或姓名搜索">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" size="small"  icon="el-icon-plus" plain>添加</el-button>
          <el-button @click="fresh" type="success" size = "small"icon="el-icon-refresh" plain>刷新</el-button>
        </div>
      </el-col>
    </el-row>


    <el-row v-for="List in recipesCollection"  gutter="20" style="margin-bottom:10px;">
      <el-col v-for="item in List" :key="item.recipeId" span="8">
        <el-card>
          <div slot="header" style="display:flex">
            <span style="flex:8">{{item.recipeTime}}   {{item.patient.name}}</span>
            <el-button @click= "goRecipeInfo(item)" style="flex:2; text-align:right;padding: 2px 0" type="text">查看</el-button>
          </div>
          <div v-for="o in item.medicineList" :key="o._id" style="padding:10px 5px;display:flex" class="text item">
            <div style="font-size: 16px;flex:8"> {{o.medicine.name}}</div>
            <div style="font-size: 16px;flex:2; color:#4FA5FE"> x {{o.num}} </div>
          </div>
          <div style="margin-top: 1px ;margin-bottom:5px; float: right">
            <el-button  type="info" size="mini" plain icon="el-icon-edit-outline" circle></el-button>
            <el-button type="danger" size="mini"plain icon="el-icon-delete" circle></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data(){
      return {
        recipes:[],
        orginalRecipes:[],
        recipesCollection:[],
        key:'',
        requestId:'',
      }
    },methods:{
      getRecipeAll() {
        axios.post("/data/recipe/getAll").then((result) => {
          var res = result.data;
          this.orginalRecipes = res.result.recipeDatas;
          this.recipes = this.orginalRecipes;
          this.dataForGraph();
        });
      },
      dataForGraph() {
        this.recipesCollection = [];//初始化防止叠加
        var i = 0;
        var threeElements = [];
        while (i<this.recipes.length){
          if(i%3==0&&i!=0) {
            this.recipesCollection.push(threeElements)
            threeElements = [];
          }
          threeElements.push(this.recipes[i]);
          if(i==this.recipes.length-1){
            this.recipesCollection.push(threeElements)
            threeElements = [];//清不清无所谓但是还是清了吧
          }
          i++;
        }
      },
      goRecipeInfo(item){
        this.$router.push({path:'/pc/recipe/'+item.recipeId})
      },
      back(){
        this.$router.replace({path:'/pc/home'})
      },
      fresh(){
        this.getRecipeAll()
      }
    },mounted() {
      this.getRecipeAll();
    },watch: {
      key: function (newVal, oldVal) {
        this.recipes =
          this.orginalRecipes.filter(data=> !newVal || data.recipeTime.toLowerCase().includes(newVal.toLowerCase())
                                                    // || data.money.toLowerCase().includes(newVal.toLowerCase())
                                                     || data.patient.name.toLowerCase().includes(newVal.toLowerCase())
          );
        this.dataForGraph();
      },


    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;margin-bottom: 10px;
  }



</style>
