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
            placeholder="按名称搜索">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" size="small" @click="addMedicine" icon="el-icon-plus" plain>添加</el-button>
          <el-button @click="fresh" type="success" size = "small"icon="el-icon-refresh" plain>刷新</el-button>
        </div>
      </el-col>
    </el-row>

    <el-table
      :data="medicineList.filter(eachData=>!key || eachData.name.toLowerCase().includes(key.toLowerCase()))"
      style="width: 100%"
      stripe
      height="460"
    >
      <el-table-column
      prop="name"
      fixed="left"
      label="名称"
      sortable
      width="140">
    </el-table-column>
      <el-table-column
        prop="medicineId"
        label="编号"
        sortable
        width="140">
      </el-table-column>

      <el-table-column
        prop="price"
        label="价格"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="num"
        label="库存"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        width="120"
        header-align="center"
      align="center">
        <template slot-scope="scope">
          <el-button @click="changeMedicine(scope.$index)" plain icon="el-icon-edit-outline" circle></el-button>
          <el-button @click="deleteMedicine(scope.$index)" type="danger" icon="el-icon-delete" plain circle></el-button>
        </template>
      </el-table-column>
      <el-table-column
      header-align="right">
        <template slot="header" slot-scope="scope">

        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title.sync="dialogHead" :visible.sync="showDialog" :close-on-click-modal="false">
      <el-form :model="tempMedicine" :rules="rules" ref="dialogForm" style="width: 66%">
        <el-form-item label="药品名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="tempMedicine.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model.number="tempMedicine.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" :label-width="formLabelWidth" prop="num">
          <el-input v-model.number="tempMedicine.num" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="sure('dialogForm',dialogHead)">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios/index'
  export default {
    data() {
      return {
        tempMedicine: {
          name: '',
          company: '保元堂',
          price: 0,
          checked: false,
          num: 0
        },
        medicineList: [],
        key: '',
        showDialog: false,
        dialogHead: '',
        formLabelWidth: '120px',
        rules: {
          name: [
            {required: true, message: '请输入药品名称', trigger: 'blur'}
          ],
          price: [
            {type: 'number', message: '价格必须是纯数字'}
          ],
          num: [
            {type: 'number', message: '库存必须是纯数字'}
          ]
        }
      }
    },
    mounted: function () {
      this.getMedicineList();
    },
    methods:{

      sure(formName, dialogHead) {
        if (dialogHead == '添加药品') {
          var url = '/add/addMedicine'
          var message = `药品 ${this.tempMedicine.name} 已经添加`
        } else if (dialogHead == '修改药品') {
          var url = '/change/changeMedicine';
          var message = `药品 ${this.tempMedicine.name} 已经修改`
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post(url, {
              medicine: this.tempMedicine
            }).then((result) => {
              this.$message({
                message: message,
                type: 'success'
              });
            });
            this.getMedicineList();
            this.showDialog = false;
          } else {
            this.$message.error("有未填写或错误的字段");
          }
        });
      },

      addMedicine() {
        this.tempMedicine = {
          name: '',
          company: '保元堂',
          price: 0,
          checked: false,
          num: 0
        };
        this.dialogHead = '添加药品';
        if (this.medicineList.length > 0) {
          var maxId = Math.max.apply(Math, this.medicineList.map(function (o) {
            return o.medicineId;
          })) + 1;
        } else {
          var maxId = 1000001;
        }
        this.tempMedicine.medicineId = maxId;
        this.showDialog = true;
      },

      changeMedicine(index) {
        this.dialogHead = '修改药品';
        this.tempMedicine = JSON.parse(JSON.stringify(this.medicineList[index]));
        this.showDialog = true;
      },

      getMedicineList() {
        axios.get("/data/medicine/getAll").then((result) => {
          var res = result.data;
          this.medicineList = res.result.list;
        })
      },

      fresh(){
        this.getMedicineList();
      },
      back(){
        this.$router.replace({path: '/pc/home'})
      },

      deleteMedicine(index) {
        this.$confirm('确定要删除这种药品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post("/delete/deleteMedicine", {
            medicineId: this.medicineList[index].medicineId
          }).then((result) => {
            this.medicineList.splice(index, 1);
            this.$message({
              type: 'success',
              message: '删除成功'
            });
          });
        }).catch(() => {
        })
      }
    },
    computed:{}

  }
</script>

<style scoped>

</style>
