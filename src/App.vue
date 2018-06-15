<template>
  <div id="app">
    <el-menu
      default-active="2"
      class="el-menu-demo" 
      mode="horizontal"
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

    <img src="./assets/logo.png">
    <div>
      <el-button @click="startHacking">Start</el-button>
      <el-button type="text" @click="open3">点击打开 Message Box</el-button>
    </div>
      
      <el-container id="main" style="width:100%; margin:10px 0px;align:center">
        
          <el-header>
            <el-button type="primary" v-on:click="getVersion" icon="el-icon-edit">Fetch Info</el-button>
            <el-button type="primary" v-on:click="getContainers" icon="el-icon-share">Fetch Table </el-button>
          </el-header>
          <el-main>
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="id" label="ID" width="80">
              </el-table-column>
              <el-table-column prop="name" label="容器名" width="180">
              </el-table-column>
              <el-table-column prop="command" label="镜像名" width="180">
              </el-table-column>
              <el-table-column prop="port" label="开放端口" width="120">
              </el-table-column>
              <el-table-column prop="created" label="创建时间" width="180">
              </el-table-column>
              <el-table-column prop="sha" label="SHA">
              </el-table-column>
            </el-table>
            <hr/>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="50">
            </el-pagination>
          </el-main>
          <el-footer>
            <router-link to="/portal">Go to Foo</router-link>
          </el-footer>
        <router-view>
        </router-view>   

    </el-container>
  </div>


</template>

<script>


import Vue from 'vue'
require('./js/sockjs.min.js')
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
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        position: 'bottom-right',
        duration: 5000
      })
    },
    getVersion() {
        $.ajax({
                  type : "GET",
                  url : "http://"+this.server.remoteIP+"/version",
                  data : {
                      
                  },
                  success : function(data) {
                          //debugger;
　　　　　　　　　　　　　　 //var message = $.parseJSON(data);
                           //vue.selectById=message;
                           alert("The version of Docker is:"+data.Version);
                  },
                  error : function(){
                      alert("Error");
                  }

              });

    },
    getContainers() {
      var self=this;
      var apiPath="http://"+this.server.remoteIP+"/containers/json";
      this.$http.get(apiPath,{params:{
         "all":true
      }}).then(data => {
          //debugger;
          self.tableData=[];
          data.body.forEach(function(currentValue, index, arr){
            self.tableData.push(
              {
                id:index, 
                command: currentValue.Command,
                port: (currentValue.State==="running"?(currentValue.Ports[0].IP+":"+currentValue.Ports[0].PrivatePort):("未开放")),
                name:currentValue.Names[0], 
                created: new Date(currentValue.Created*1000).toLocaleString("yyyy-MM-dd hh:mm:ss"),
                sha:currentValue.ImageID
              });
          });
        }, error =>{
             alert("Error");
      });
    },
    open3() {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}



var sockjs_url = 'http://10.42.1.247:10086/api/';  
var sockjs = new SockJS(sockjs_url);  

sockjs.onopen    = function(){console.log('[*] open'+sockjs.protocol);
    sockjs.send("server.js");
};  


sockjs.onmessage = function(e) {console.log('[.] message'+e.data);};  
sockjs.onclose   = function()  {console.log('[*] close');};  


</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
.el-table th{
  text-align:center;
}
hr {border-color:transparent;
}
</style>
