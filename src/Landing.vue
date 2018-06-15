<template>
  <div id="app">
    <el-menu
      default-active="2"
      class="el-menu-demo" 
      mode="vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>

   
      
      
  </div>


</template>

<script>


import Vue from 'vue'

//import $ from 'jquery'

export default {
  data(){
    return {
      server:{
        remoteIP:"10.42.0.247:4243"
      },
      tableData:[

      ]
    }
  },
  methods: {
    
  }
}


</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
  width:1920px;height:1080px;
  background-image:url(./assets/images/hd-bg.jpg);
  overflow:hidden;
}
.el-table th{
  text-align:center;
}
hr {border-color:transparent;
}
</style>
