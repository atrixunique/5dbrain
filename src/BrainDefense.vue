<template>
  <div>

    <el-container>
      <el-header id="navbar"><span>{{Date().toLocaleString("hh:mm:ss")}}</span></el-header>
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


            <div>

              <div class="consolewindow" id="consolewindow">

              </div>
              <div style="height:20px">
                <input type="text" class="commandline" placeholder="Input command"></input>
              </div>

            </div>

          </el-aside>


          <!-- The main area to display-->
          <!-- *********************** -->
          <router-view>
            
          </router-view>
          <!-- Main area ends -->


        </el-container>

      </el-main>
      <footer>CETCSC</footer>
      
    </el-container>
    <div id="cstklc">
      <img src="./assets/images/cstklc.png"/>
    </div>
      
  </div>


</template>

<script>

import Vue from 'vue'

export default {
  data(){
    return {
      server:{
        //remoteIP:"10.42.0.247:4243"
      },
      menuItems:[
        {id:0,name:"防御首页 Dashboard",path:"/Dashboard"},
        {id:1,name:"容器管理 Container Mgmt",path:"/Container"},
        {id:2,name:"镜像管理 Image Mgmt",path:"/Image"},
        {id:3,name:"信息管理 Info Mgmt",path:"/Info"},
        {id:4,name:"知识管理 Knowledge Mgmt",path:"/Knowledge"},
        {id:5,name:"决策管理 Decision Mgmt",path:"/Decision"},
        {id:6,name:"系统管理 System Mgmt2",path:"/System"}
      ],
      stompClient:null
    }
  },
  methods: {
      notifyMsg:function(msg)
      {
         this.$notify.info({
                title: '隧道消息',
                message: msg
              });
      }
  },
  mounted(){
    var _self=this;
    
    this.$root.eventHub.$on('command-log', function(data){
            var color;
            var d = new Date();
      
            //if (data.type == "info") color = "#3f5e9c";
            //if (data.type == "warning") color = "red";
            //if (data.type == "success") color = "green";

            var msgNode = document.createElement("span");
            var textNode = document.createTextNode(d.toLocaleCNString("[hh:mm:ss]")+"  "+data.text);
            msgNode.appendChild(textNode);
            var cw=document.getElementById("consolewindow");
            cw.appendChild(msgNode);
            cw.appendChild(document.createElement("BR"));
            cw.scrollTop = cw.scrollHeight;
          
        });
        
    this.$root.eventHub.$on('command-clear', function(){
        var cw=document.getElementById("consolewindow");
        cw.innerHTML="";
        cw.scrollTop = cw.scrollHeight; 
    });

    
    
    this.$root.eventHub.$emit('command-clear');


    var sockJS= require('./assets/js/sockjs.min.js');
    var Stomp = require("./assets/js/stomp.min.js").Stomp;
    var isconn= false;

    
    if(isconn) {
        
        this.$root.eventHub.$emit('command-log', {text: "Connecting to subsription channel...", type: "info"});

        var sockjs_url = "http://10.38.7.90:9999/webSocketServer";  
        var sockjs = new SockJS(sockjs_url);  
        this.stompClient = Stomp.over(sockjs);
      
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

        this.stompClient.connect(
          {},
          function connectCallback(frame){

            //stompClient.send("/app/sendTest",{},JSON.stringify({ "name": "456" }));

            _self.stompClient.subscribe("/topic/subscribeSSH", function(response){

                  console.log("[data]"+ response.body); 
                  _self.notifyMsg(response.body);
            })
            _self.stompClient.send("/app/subscribeSSH",{},JSON.stringify({ "name": "eureka"}));

            _self.stompClient.subscribe("/topic/subscribeFirewall", function(response){
                  console.log("[firewall]"+response.body);
                  //var bd=eval("("+response.body+")");
                  _self.notifyMsg(response.body);

            });
            _self.stompClient.send("/app/subscribeFirewall",{},JSON.stringify({ "name": "gold firewall"}));


            _self.stompClient.subscribe("/topic/subscribeConpot", function(response){
                
                  console.log("[conpot]"+response.body);
                  _self.notifyMsg(response.body);

            });
            _self.stompClient.send("/app/subscribeConpot",{},JSON.stringify({ "name": "silver conpot"}));

            _self.stompClient.subscribe("/topic/subscribeDecision", function(response){
                
                  console.log("[decision]"+response.body);
                  _self.notifyMsg(response.body);

            });
            _self.stompClient.send("/app/subscribeDecision",{},JSON.stringify({ "name": "Try decision 1"}));

            
          },
          function errorCallback(error) {
              console.log("连接失败" + error);
          }

        );
    }



  }
}

Date.prototype.toLocaleCNString = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份 
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //小时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};


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
  color:#6388c1;
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
.consolewindow{

  padding:5px;
  margin-top:130px;
  width:280px;
  height:160px;
  margin-left:26px;
  font-size:12px;
  overflow-y:scroll;
  overflow-x:hidden;
  text-align:left;
}
.commandline
{
    margin-left: -5px;
    margin-top:10px;
    font-size: 12px;
    background: #000;
    border: 1px groove darkgray;
    color: #ccc;
    padding: 5px;
    width: 280px;
}



</style>
