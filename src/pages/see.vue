<template>
  <div>
    <h1>{{username}} :</h1>
    <h3>欢迎欢迎 热烈欢迎</h3>
<!--  <el-carousel height="200px">-->
<!--    <el-carousel-item v-for="item in imgList" :key="item.id">-->
<!--      <el-row type="flex"  justify="space-between">-->
<!--        <el-col :span="2"></el-col>-->
<!--        <el-col :span="20"><img :src="item.idView" style="width:100%;height:100%"/></el-col>-->
<!--        <el-col :span="2"></el-col>-->
<!--      </el-row>-->
<!--    </el-carousel-item>-->
<!--  </el-carousel>-->
    <div style="margin:0 auto">
    <img src="../assets/pikachu.gif" style="width: 50%" height="50%"></img>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
          return {
            // imgList: [
            //   {id: 0, name: '1',idView: require('../assets/snow.jpg')},
            //   {id: 1, name: '2', idView: require('../assets/sea.jpg')},
            //   {id: 2, name: '3', idView: require('../assets/sky.jpg')},
            //   {id: 2, name: '4', idView: require('../assets/wave.jpg')}
            // ]
          }
        },
      computed: {
        username() {
          return this.$store.state.username;
        }
      }
    }
</script>

<style scoped>

</style>
