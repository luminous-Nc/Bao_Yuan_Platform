<template>
    <div>
      <el-container direction="vertical" ref="topContainer">
      <nav-header ref="header"></nav-header>
        <el-container ref="secondContainer">
        <el-aside width="200px" style="background: black">
          <Sidebar></Sidebar>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
        </el-container>

      </el-container>
    </div>
</template>

<script>
  import axios from 'axios'
  import NavHeader from '@/components/Header.vue'
  import Sidebar from '@/components/Siderbar.vue'
    export default {
      data() {
        return {
          firstHeight:0,
          headerHeight:0,
          secondHeight:0,
          element:{}
        }
      }, components: {
        NavHeader,
        Sidebar
      },mounted() {
        this.checkLogin();

        this.firstHeight = `${document.documentElement.clientHeight}`
        this.secondHeight = this.$refs.header.$el.style.height;

        window.onresize = function temp() {
          this.firstHeight = `${document.documentElement.clientHeight}`
          this.secondHeight = this.$refs.header.$el.style.height;
        };

      },
        watch: {
          firstHeight:function (newVal, oldVal) {
            this.changeFixed(newVal)
          }
        },methods:{
          changeFixed(firstHeight){
          this.$refs.topContainer.$el.style.height = firstHeight+'px';
          this.$refs.secondContainer.$el.style.height = (firstHeight-50)+'px';
          },

        checkLogin() {

          axios.post("/user/checkLogin").then((response) => {
            let res = response.data;
            if (res.status == '0') {
              this.$store.commit("changeIfLogin", true);
              this.$store.commit("changeUsername", res.result.username);
            } else {
              this.$store.commit("changeIfLogin", false);
            }
            if (this.$store.state.ifLogin == false) {
              this.$message({
                message: '当前未登录 返回登陆页面',
                type: 'warning'
              });
              this.$router.replace("/login")
            }
          })
        }
        }

    }
</script>

<style scoped>

</style>
