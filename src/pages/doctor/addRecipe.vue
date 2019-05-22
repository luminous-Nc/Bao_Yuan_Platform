<template>
  <div>
    <h2>开具处方</h2>
    <div style="display: flex">

      <el-card style="flex: 1">
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

        <div style="margin: 40px 0px;">
          <div style="margin: 8px 0px"><b>名称:</b> {{readyMedicine.name}}</div>
          <div style="margin: 8px 0px"><b>价格:</b> {{readyMedicine.price}}</div>
          <div style="margin: 8px 0px"><b>库存:</b> {{readyMedicine.num}}</div>
        </div>
        <el-button @click="addMedicine">添加进处方<i class="el-icon-d-arrow-right"></i></el-button>

      </el-card>
      <el-card
        style="flex: 3;margin-left:8px">{{a}}
        <el-table
          :data="tempMedicineList"
          stripe
          empty-text="请从左边选择药品并添加"
          height="300">
          <el-table-column
            prop="medicine.name"
            fixed="left"
            label="药品名称"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="medicine.price"
            label="价格"
            width="70">
          </el-table-column>
          <el-table-column
            label="数量"
            header-align="center"
            width="140">
            <template slot-scope="scope">
              <el-input-number size="mini" :step="1" v-model="tempMedicineList[scope.$index].num" :min="1"
                               label="数量"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            label="小计"
            align="center"
            header-align="center"
            width="120">
            <template slot-scope="scope">
              {{tempMedicineList[scope.$index].totalPrice}}
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button style="width: 100px" type="danger" size="mini" plain
                         @click.prevent="removeMedicine(scope.$index,scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 8px">
          <div><b>合计：</b>{{recipe.money}} 元</div>
        </div>
      </el-card>
    </div>

    <el-button type="primary" style="float:right;margin-top: 8px;" @click="nextStep">下一步</el-button>

  </div>
</template>

<script>

  import axios from 'axios'

  export default {
    name: "addRecipe",
    data() {
      return {
        recipe: {
          medicineList: []
        },
        allMedicine: [],
        queryName: '',
        readyMedicine: {},
        recipeList: [],
        maxId: 0,
      }

    },
    computed: {
      tempMedicineList() {
        let hehe = this.recipe.medicineList;
        this.recipe.money = 0;
        if (hehe.length > 0) {
          for (var i = 0; i < hehe.length; i++) {
            hehe[i].totalPrice = hehe[i].medicine.price * hehe[i].num;
            this.recipe.money += hehe[i].totalPrice;
          }
        }
        return hehe;
      }
    },
    mounted() {

      axios.get("/data/medicine/getAll").then((result) => {
        var res = result.data;
        this.allMedicine = res.result.list;
      });

      axios.get("/data/recipe/getAll").then((result) => {
        var res = result.data;
        this.recipeList = res.result.recipeDatas;
        if (this.recipeList.length > 0) {
          this.maxId = Math.max.apply(Math, this.recipeList.map(function (o) {
            return o.recipeId
          }));
          this.recipe.recipeId = this.maxId + 1;
        } else {
          this.recipe.recipeId = 1000001;
        }
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
    },

    methods: {
      querySearch(key, cb) {
        let results = this.allMedicine.filter(data => data.name.toLowerCase().includes(key.toLowerCase()));
        cb(results);
      },

      selectMedicine(item) {
        this.readyMedicine = item;
      },


      nextStep() {
        if (this.recipe.medicineList.length < 1) {
          this.$message.error("处方中没有药品");
          return;
        }
        axios.post("/add/addRecipe", {
          newRecipe: this.recipe
        }).then((result) => {
          var res = result.data;
          this.recipe['_id'] = res.result.createResult._id;
          this.$store.commit("updateRecipe", this.recipe);
          this.$store.commit("addRecipeId", this.recipe._id);
          this.$message({
            message: '处方已经创建!',
            type: 'success'
          });
          this.$store.commit("nextStep");
        });

      },

      removeMedicine(index, row) {
        this.$message.error(row.toString());
        if (index !== -1) {
          this.localMedicineList.splice(index, 1)
        }
      },
      addMedicine() {
        if (JSON.stringify(this.readyMedicine) == "{}") {
          this.$message.error("没有选择药品");
        } else {
          var target = -1;
          for (var i = 0; i < this.recipe.medicineList.length; i++) {
            if (this.recipe.medicineList[i].medicine == this.readyMedicine) {
              target = i;
            }
          }
          if (target == -1) {
            this.recipe.medicineList.push({
              medicine: this.readyMedicine,
              num: 1,
              totalPrice: this.readyMedicine.price
            });
          } else {
            this.recipe.medicineList[target].num++;
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
