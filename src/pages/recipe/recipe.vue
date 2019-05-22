<template>
  <div>
    <el-row style="margin-bottom:10px" type="flex" justify="left">
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
            placeholder="按日期或姓名搜索">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button @click="fresh" type="success" size = "small"icon="el-icon-refresh" plain>刷新</el-button>
        </div>
      </el-col>
    </el-row>


    <el-row v-for="List in recipesCollection"  gutter="20" style="margin-bottom:10px;">
      <el-col v-for="item in List" :key="item.recipeId" :span="8">
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
            <el-button type="info" @click="changeRecipe(item)" size="mini" plain icon="el-icon-edit-outline"
                       circle></el-button>
            <el-button type="danger" @click="deleteRecipe(item) " size="mini" plain icon="el-icon-delete"
                       circle></el-button>
          </div>
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
        recipes:[],
        orginalRecipes:[],
        recipesCollection:[],
        key:'',
        requestId:'',
      }
    },methods:{
      getRecipeAll() {
        axios.get("/data/recipe/getAll").then((result) => {
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
            threeElements = [];
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
      },
      changeRecipe(item) {
        this.$message.error('业务逻辑上不应该对处方进行更改');
      },
      deleteRecipe(item) {
        this.$confirm('确定要删除这张处方吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post("/delete/deleteRecipe", {
            id: item._id
          }).then((result) => {
            var index = this.recipes.indexOf(item);
            this.recipes.splice(index, 1);
            this.dataForGraph();
            this.$message({
              type: 'success',
              message: '删除成功'
            });
          });
        }).catch(() => {
        })
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
