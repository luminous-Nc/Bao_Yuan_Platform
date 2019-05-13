<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-top:12px ;font-size: 18px;">
        <template v-if="breadList.length==2||breadList.length==3">
            <el-breadcrumb-item :to="{name:'see'}">首页</el-breadcrumb-item>
          <template v-if="breadList[1]!='home'">
            <el-breadcrumb-item :to="{name:''+breadList[1]}">{{breadsName[breadList[1]]}}</el-breadcrumb-item>
          </template>
          <template v-if="breadList.length==3">
            <el-breadcrumb-item>详情</el-breadcrumb-item>
          </template>
        </template>
      </el-breadcrumb>

    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          breadsName: {
            'medicine': '药品信息',
            'patient': '患者信息',
            'diagnose': '就诊信息',
            'recipe':'处方信息',
            'begin':'接诊'
          },
          breadList: [],
          pathUrl:'',
        };
      },
      mounted:{
      },
      methods: {
        goLink(bread) {
          this.$router.push('/pc/'+bread);
        }
      },
      watch: {
        "$route"() {
          this.pathUrl = this.$route.path;
          this.breadList = this.pathUrl.split('/');
          this.breadList = this.breadList.slice(1)
        }
      }
    }
  </script>

<style>

</style>
