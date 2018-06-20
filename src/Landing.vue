<template>
  <div id="app">
    <el-container>
      <el-header id="navbar"><span>Time 16:03:27</span></el-header>
      <el-main>
        <el-container style="height:1005px">
          <el-aside style="width:338px;">
            <div style="height:250px;"></div>
            <div class="menuDiv">
            <el-menu
                class="el-menu-demo" mode="vertical" background-color="transparent"
                text-color="#fff" active-text-color="#ffd04b" :default-active="this.$route.meta.mid+''" 
                router>

                <router-link v-for="item in menuItems" :to="item.path" :key="'menu'+item.path">
                   <el-menu-item :index="item.id+''">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{item.name}}</span>
                  </el-menu-item>
                </router-link>

              </el-menu>
            </div>
            <div style="bottom:0px;">Route</div>

          </el-aside>
          <!-- The main area to display-->
          <router-view>
            
          </router-view>
      
        </el-container>

      </el-main>
      <footer>This is footer</footer>
      
    </el-container>
    <div id="cstklc">
      <img src="./assets/images/cstklc.png"/>
    </div>
      
  </div>


</template>

<script>


import Vue from 'vue'
var sockJS= require('./assets/js/sockjs.min.js')
var Stomp = require("./assets/js/stomp.min.js").Stomp
var isconn= true
//var Stomp=window.Stomp
//debugger;

//import $ from 'jquery'

export default {
  data(){
    return {
      server:{
        remoteIP:"10.42.0.247:4243"
      },
      menuItems:[
        {id:0,name:"防御首页 Dashboard",path:"/"},
        {id:1,name:"容器管理 Container Mgmt",path:"/Container"},
        {id:2,name:"镜像管理 Image Mgmt",path:"/Image"},
        {id:3,name:"信息管理 Info Mgmt",path:"/Info"},
        {id:4,name:"决策管理 Decision Mgmt",path:"/Decision"},
        {id:5,name:"系统管理 System Mgmt",path:"/System"}
      ]
    }
  },
  methods: {
    
  }
}


if(isconn) {
     

    var sockjs_url = "http://10.42.0.90:9999/webSocketServer";  
    var sockjs = new SockJS(sockjs_url);  
    var stompClient = Stomp.over(sockjs);

       

     /*
    var url = "ws://10.42.0.90:9999/";
    var stompClient = Stomp.client(url);
    var headers = {
          login: 'atrix',
          passcode: '123',
          // additional header
          'client-id': 'sub-0'
        };
    */

    stompClient.connect(
      {},
      function connectCallback(frame){

        //stompClient.send("/app/sendTest",{},JSON.stringify({ "name": "456" }));

        stompClient.subscribe("/app/subscribeSSH", function(response){
          console.log("[ok] subscribe successful");
          console.log("[data]"+ response.body); 

         stompClient.subscribe("/app/topic/subscribeSSH", function(response){
            
              console.log("[2]"+response.body);

          });
          //stompClient.send("/app/sendTest",{},JSON.stringify({ "name": "123" }));
        })
      },
      function errorCallback(error) {
          console.log("连接失败" + error);
      }

    );
}
// 

</script>

<style>
body {
  margin:0px;
  color:#bde8ff;
}
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei";
  text-align: center;
  width:1920px;height:1080px;
  background-image:url(./assets/images/bg-landing.jpg);
}
html { overflow: hidden; }
#navbar {
  font-family:'open-sans-light', sans-serif;
  font-size:20px;
  height:50px !important;
  text-align:right;
  padding-right:100px;
  line-height:50px;
}
.el-table th{
  text-align:center;
}
.el-menu-item, .el-submenu{
  text-align:left;
}
.el-menu-item:hover, .el-menu-item:focus
{background-color:#22457c !important;}
.menuDiv{
  
  border-top:1px solid #3963A7;
  border-bottom:1px solid #3963A7;
  overflow-y:scroll;
}

.el-main {
  bottom:0px;
  padding:0px;
}
footer{
  height:25px;
}

hr {border-color:transparent;}

::-webkit-scrollbar    
{    
    width: 6px;    
    height: 6px;    
    background-color:#152846;    
}    
    
/*定义滚动条轨道 内阴影+圆角*/    
::-webkit-scrollbar-track    
{    
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);    
    border-radius: 10px;    
    background-color: #152846;    
}    
    
/*定义滑块 内阴影+圆角*/    
::-webkit-scrollbar-thumb    
{    
    border-radius: 10px;    
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);    
    background-color: #6388c1;    
}  

#cstklc
{
  position:absolute;
  z-index:999;
  right:0px;
  top:0px;
}

/*V 页面专用 */


#pageExplanation{
    height:80px;
    width:350px;
    color:lightgrey;
    margin:50px 0px 0px 180px;
    font-size:14px;
    text-align:left;
}
.containerEntity {
    position:absolute;
}



</style>
