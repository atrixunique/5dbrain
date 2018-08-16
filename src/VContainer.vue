<template>
    <el-main>
         <div class="asideimage" :style ="asideimage">
            <div style="height:125px"></div>
           

             <node-item v-for="(node, index) in nodes" class="blocknode" 
                v-bind:id="'BO'+node.domain"
                :style="blocknode" 
                :domain="node.domain" 
                :ip="node.ip" 
                :containers="node.containers" 
                :images="node.images" 
                :key="node.domain">
            </node-item>


        <div class="containercontainer" :style="containercontainer">
            <div style="position:absolute;left:96px;top:20px;height:20px;width:230px;text-align:left">
                <span>节点IP:10.42.0.133</span>
            </div>
            <div style="position:absolute;left:84px;top:88px;height:20px;width:230px;text-align:left">
                <span>共6容器，3运行，3停止</span>
            </div>

            <div style="position:absolute;left:5px;top:135px;height:330px;width:320px;">
                
                <el-tooltip class="item" effect="light" 
                    :content="contextmenu" 
                    v-for="(container, index) in nodecontainers" 
                    :key="container.Id" >
                        <node-badge
                            v-bind:id="'NB'+container.Id" 
                            
                            :name="container.Id" 
                            :running="container.State" 
                            :typeimg="getContainerClass(container.ImageID)"
                            >
                        </node-badge>
                </el-tooltip>
                

            </div>

        </div>




        <div style="height:75px"></div>
            <img src="./assets/images/new-container.png" width=340 style="cursor:pointer"/>
        </div>

        <div class="ribbonimage" :style ="ribbonimage" style="text-align:left;">
             <span style="position:relative;top:60px;left:40px;padding-right:120px;">防御脑是人工智能应用于网络空间防御多元目标的深刻实践，通过生能、聚能、赋能、释能机制，实现安全能力的精准投送和攻击面的全局管理。 <br/>
             <span style="font-size:80%;color:#999">Defense Brain is an active component of 5D brain, that profoundly apply dynamic and intelligent mechanism into cyberspace defense practice by generating, aggregating, enabling and discharging energy, to overwhelmingly  achineve attacking surface management and exact security abilities delivery</span></span>
        </div>


        <div class="containerEntity" style="left:305px; top:460px; width:900px;">
           
                
        </div>


    </el-main>
</template>

<script>
import Vue from 'vue';
import Mock from 'mockjs';
import axios from 'axios';

import {getServiceIP, mockAll} from './mockdata.js';

Vue.component('node-item', {
  data() {
    return {
    }
  },
  props: ['domain','ip','containers','images'],
  template: '<div><div class="d-domain">{{domain}}</div><div class="d-ip">{{ip}}</div><div class="d-containers">{{containers}}</div></div>'
})

Vue.component('node-badge', {
  data() {
    return {
    }
  },
  props: ['name','typeimg','running'],
  template: '<div class="badge-item" :style="typeimg"><span>{{name}}</span><sup class="el-badge" :class="running">o</sup></div>'
})

export default {
    name: 'containermgmt',
    data() {
        return {
            nodes:[],
            nodecontainers:[],
            asideimage: {
                backgroundImage: "url("+require("./assets/images/aside-image.png") + ")",
                position:"absolute",
                top:"50px",
                right:"0px",
                width:"340px",
                height:"1000px",
                paddingLeft:"4px"
            },
            blocknode: {
                backgroundImage: "url("+require("./assets/images/block-node.png") + ")",
                width:"340px",
                height:"60px"
            },
            ribbonimage: {
                backgroundImage: "url("+require("./assets/images/ribbon-container.png") + ")",
                position:"absolute",
                left:"324px",
                top:"158px",
                width:"1257px",
                height:"153px"
            },
            containercontainer: {
                backgroundImage: "url("+require("./assets/images/container-container.png") + ")"
            },
            containerfwclass:{
                backgroundImage: "url("+require("./assets/images/container-fw.png") + ")"
            },
            containerhpclass:{
                backgroundImage: "url("+require("./assets/images/container-hp.png") + ")"
            },
            containermnclass:{
                backgroundImage: "url("+require("./assets/images/container-mn.png") + ")"
            },
            containernullclass:{
                backgroundImage: "url("+require("./assets/images/container-null.png") + ")"
            },
            contextmenu:"<el-button type='text'>文字按钮</el-button>"
        }
     },
     methods:{
        getContainerClass:function(msg){
            if(msg=="sha256:fw") return this.containerfwclass;
            else if(msg=="sha256:hp") return this.containerhpclass;
            else return this.containernullclass;
            
        }
     },
     mounted() {
        var self=this;
        mockAll();
     
        axios.get(getServiceIP()+"/cluster/list").then(function(response){    
            //console.log(response);
            self.nodes=response.data.result;
           
        });
        axios.get(getServiceIP()+"/docker/listcontainer").then(function(response){    
            //console.log(response);
            self.nodecontainers=response.data.result.container; 
        });

        
    }
}
</script>

<style>
.blocknode {text-align:left;font-size:13px;}
.blocknode div {position:relative;float:left;margin-top:22px;}

.blocknode .d-domain   { left:26px;font-size:16px; }
.blocknode .d-ip { left:65px;padding-top:3px }
.blocknode .d-containers{left:168px}

.blocknode:hover, .activenode
{
    box-shadow:inset 0px 0px 8px #AAA;
    -webkit-filter: contrast(1.5);
    cursor: pointer;
}

.containercontainer{
    position:relative;
    width:340px;
    height:470px;
    margin-top:20px;
    background-repeat:no-repeat;
    margin-left:5px;
}
.badge-item{
     margin:20px 15px 0 15px;
     width:70px;
     height:90px;
     text-align:center;
     position:relative;
     cursor:pointer;
     float:left;
     background-repeat:no-repeat;
}
.badge-item span{
     line-height:150px;
}

.el-badge {
    background-color: #f56c6c;
    border-radius: 10px;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    padding: 0 6px;
    text-align: center;
    border: 1px solid #fff;
    position: absolute;
    top: 0;
    right: 10px;
    -webkit-transform: translateY(-50%) translateX(100%);
}
.is-running{
    background-color: #2b8e1f;
}
.el-tooltip__popper.is-light {
    color:black;
    font-family:微软雅黑;}
</style>








