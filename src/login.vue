<template>
  <div style="margin:0 auto;width: 300px">
    <el-card style="margin-top: 200px">
      <div>
        <el-input placeholder="请输入密码" v-model="key" show-password></el-input>
      </div>
      <div style="margin-top: 30px;display:flex">
        <div style="flex:1"></div>
        <el-button style="flex:2;width: 150px;text-align: center" type="primary" @click="login">登录</el-button>
        <div style="flex:1"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "login",
    data() {
      return {
        key: '',
        errorTip: true
      }
    },
    methods: {
      login() {
        if (this.key == '') {
          this.$message({
            message: '请输入密码',
            type: 'warning'
          });
          return;
        }
        axios.post("/user/login", {
          password: this.key
        }).then((response) => {
          let res = response.data;
          if (res.status == '0') {
            this.errorTip = false;
            this.$store.commit("changeIfLogin", true);
            this.$store.commit("changeUsername", res.result.username);
            this.$router.replace('/pc/home');
          } else if (res.status == '1') {
            this.key = '';
            this.$message({
              message: '密码不正确',
              type: 'warning'
            });
          } else {
            this.$message.error('服务器错误，它可能开小差了');
          }
        })
      }
    },
    computed: {
      // ifLogin(){
      //   return this.$store.state.userName;
      // }
    }
  }
</script>

<style scoped>

</style>
