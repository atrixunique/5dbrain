<template>
    <el-main>
        <el-dialog title="新建容器" :visible.sync="dialogNewContainerVisible" width="30%">
            <el-form :model="formNewContainer" style="text-align:left">

                <el-form-item label="节点名称：" :label-width="formLabelWidth">
                    <el-select v-model="formNewContainer.nodeName">
                        <el-option v-for ="node in nodes" :label="node.domain" :key="'opn_'+node.domain" :value="node.domain"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="镜像名称：" :label-width="formLabelWidth">
                    <el-select v-model="formNewContainer.imageName">
                        <el-option v-for ="image in sourceimages" :label="image.name" :key="'opi_'+image.name" :value="image.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="容器名称：" :label-width="formLabelWidth">
                    <el-input v-model="formNewContainer.containerName"></el-input>
                </el-form-item>

                <el-form-item label="宿主端口：" :label-width="formLabelWidth">
                    <el-col :span="9">
                         <el-input v-model="formNewContainer.port" ></el-input>
                    </el-col>
                    <el-col :span="6">
                        &nbsp;&nbsp;映射端口：
                    </el-col>
                    <el-col :span="9">
                        <el-input v-model="formNewContainer.toport"></el-input>
                    </el-col>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogNewContainerVisible = false">取消</el-button>
                <el-button type="primary" @click="addNewContainer">添加</el-button>
            </div>
        </el-dialog>

         <div class="asideimage" :style ="asideimage">
            <div style="height:125px"></div>
           

             <node-item v-for="(node, index) in nodes" class="blocknode" 
                v-bind:id="'BO'+node.domain"
                :style="blocknode" 
                :domain="node.domain" 
                :ip="node.ip" 
                :containers="node.containers" 
                :images="node.images" 
                :key="node.domain"
                @mouseover.native="setActive(index)"
                @mouseout.native="unsetActive(index)"
                @click.native="nodeClick(index, node.domain)"
                >
            </node-item>

            <div style="height:105px"></div>

            <div class="containercontainer" :style="containercontainer">
                <div style="position:absolute;left:96px;top:20px;height:20px;width:230px;text-align:left">
                    <span>节点IP:{{selectedIP}}</span>
                </div>
                <div style="position:absolute;left:84px;top:88px;height:20px;width:230px;text-align:left">
                    <span>共{{selectedTotal}}容器，{{selectedRunning}}运行，{{selectedTotal-selectedRunning}}停止</span>
                </div>

                <div style="position:absolute;left:5px;top:135px;height:330px;width:320px;">
                    <el-popover
                        placement="bottom"
                        width="120"
                        height="60"
                        trigger="hover"
                        v-for="(container, index) in nodecontainers" 
                        :key="container.Id"
                        >
                        <el-button type='text' size="small" @click="startContainer(index)">
                            启动
                        </el-button>
                        <el-button type='text' size="small" @click="stopContainer(index)">
                            停止
                        </el-button>
                        <el-button type='text' size="small" @click="deleteContainer(index)">
                            删除
                        </el-button>

                        <node-badge
                                v-bind:id="'NB'+container.Id" 
                                slot="reference"
                                :name="container.Names[0]" 
                                :running="container.State" 
                                :typeimg="getContainerClass(container.ImageID)"
                                >
                            </node-badge>
                    </el-popover>
                </div>

            </div>

            <div>
                <img src="./assets/images/new-container.png" width=340 style="cursor:pointer" @click="dialogNewContainerVisible=true"/>
            </div>
        </div>
        <!-- Detail info listed for a certain container -->
        <div class="detailimage" :style ="detailimage">
        </div>

        <div class="ribbonimage" :style ="ribbonimage" style="text-align:left;">
            <span style="position:relative;top:60px;left:40px;padding-right:140px;">容器是在节点上运行的的受限进程，是镜像的实体，可以被创建、启动、停止、删除、暂停等。容器进程是运行在隔离的环境里，因而相比直接在宿主上运行更加安全。 <br/>
            <span style="font-size:80%;color:#999">Container is restricted process running on nodes, is the entity of image that can be created, run, stopped, deleted and suspended. The process in a container is running in isolated env, that is safer compared with running on naked host.</span></span>
        </div>


        <div class="containerEntity" :style ="entitybackground">

                     
        </div>
        <img v-for="(node, index) in nodes"
            class="isometric-node" 
            v-bind:id="'LN'+index"
            v-bind:style="computeLeft(index ,'node')"
            v-bind:class="{isometricglow:isActive(index)}"
            src="./assets/images/big-node.png" 
            width=180>
        </img>
        <div v-for="(node, index) in nodes"
                class="isometric-div"
                v-bind:id="'LB'+index"
                v-bind:style="computeLeft(index ,'label')"
                > {{node.ip}}
        </div>
        <div v-for="(node, index) in nodes"
                class="isometric-div"
                v-bind:id="'LB'+index"
                v-bind:style="computeLeft(index ,'label',-10)"
                > {{node.domain}}
        </div>
        
    </el-main>
</template>

<script>
import Vue from 'vue';
import Mock from 'mockjs';
import axios from 'axios';

import {getServiceIP, mockAll} from './mockdata.js';
import {clog} from './commonfunc.js';

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
  template: '<div class="badge-item" :style="typeimg"><span>{{name}}</span><sup class="el-badge" :class="running">{{running}}</sup></div>'
})

export default {
    name: 'containermgmt',
    data() {
        return {
            nodes:[],
            nodecontainers:[],
            sourceimages:[],
            formNewContainer:{
                nodeName:'',
                imageName:'',
                containerName:'',
                port:'',
                toport:''
            },
            activeNode:-1,
            selectedNode:-1,
            selectedIP:'',
            selectedTotal:0,
            selectedRunning:0,
            dialogNewContainerVisible:false,
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
            entitybackground: {
                backgroundImage: "url("+require("./assets/images/entity-container.png") + ")",
                left:"280px",
                top:"350px",
                width:"1100px",
                height:"668px"
            },
            ribbonimage: {
                backgroundImage: "url("+require("./assets/images/ribbon-container.png") + ")",
                position:"absolute",
                left:"324px",
                top:"158px",
                width:"1257px",
                height:"153px"
            },
            detailimage: {
                backgroundImage: "url("+require("./assets/images/detail-container.png") + ")",
                position:"absolute",
                top:"520px",
                right:"340px",
                width:"340px",
                height:"495px",
                paddingLeft:"2px",
                zIndex:"10"
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
            formLabelWidth: '100px'
        }
     },
     methods:{
        computeLeft:function(index, op, offset=0){
            
            var step=150;
            var startX=785, startY=520+offset;
            if(op=="label") {startX=865;startY=659+offset;}
            
            var l=(startX-index*step*Math.cos(Math.PI/6.0))+'';
            var t=(startY+index*step*Math.sin(Math.PI/6.0))+'';
            return {left: l +'px', top: t+'px'}
        },
        setActive:function(index){
            this.activeNode=index;
        },
        unsetActive:function(index){
            this.activeNode=-1;
        },
        isActive:function(index){
            if(this.activeNode==index || this.selectedNode==index) return true;
            return false;       
        },
        nodeClick:function(index, domain){
            var self=this;
            self.selectedNode=index;
            
            axios.defaults.headers.post['Content-Type'] = 'application/json';
            axios({
                method: 'post',
                url:getServiceIP()+"/docker/listcontainer",
                data:'{"nodename":"'+domain+'"}'
            }).then((response)=>{
                self.nodecontainers=response.data.container;
                self.selectedIP=self.nodes[self.selectedNode].ip;
                self.selectedTotal=self.nodecontainers.length;

                self.$root.eventHub.$emit('command-log', {text: "Select Node "+index, type: "info"});
            });
        },
        getContainerClass:function(msg){
            if(msg=="sha256:fw") return this.containerfwclass;
            else if(msg=="sha256:hp") return this.containerhpclass;
            else return this.containernullclass;
            
        },
        startContainer:function(index){
            //alert("start"+index);
            this.$message({
                message: '节点x上的容器'+index+'正在启动中'
            });

            this.$message({
                message: '启动成功',
                type: 'success'
            });
        },
        stopContainer:function(index){
            alert("stop"+index);
        },
        deleteContainer:function(index){
            this.$confirm('此操作将永久删除该容器, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        addNewContainer:function(){
            var self=this;
            self.dialogNewContainerVisible=false;
            //alert(1);
            self.$message({
                message: '已在'+self.formNewContainer.nodeName+'添加容器'+self.formNewContainer.containerName,
                type: 'success'
            });
        }
     },
     mounted() {
        var self=this;
        mockAll();

        //clog("System Started", "info");
        this.$root.eventHub.$emit('command-log', {text: "Container Management Interface", type: "info"});

        axios.get(getServiceIP()+"/cluster/list").then(function(response){    
            //console.log(response);
            self.nodes=response.data.result;
            if(self.nodes.length) self.formNewContainer.nodeName=self.nodes[0].domain;
           
        });

        axios.get(getServiceIP()+"/action/listimages").then(function(response){    
            //console.log(response);
            self.sourceimages=response.data.repositories; 
            if(self.sourceimages.length) self.formNewContainer.imageName=self.sourceimages[0].name;
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
     height:30px;
     text-align:center;
     position:relative;
     cursor:pointer;
     float:left;
     background-repeat:no-repeat;
     padding-top:55px;
}
.badge-item span{
     font-size:12px;
     width:60px;
     word-wrap: break-word;
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
    right: 30px;
    -webkit-transform: translateY(-50%) translateX(100%);
}
.running{
    background-color: #2b8e1f;
}
.isometric-node{
    position:absolute;
    cursor:pointer;
}
.isometric-div {
    position:absolute;
    width: 80px;
    text-align:center;
    background-color:darkblue;
	transform: rotateX(305deg) rotateY(35deg) rotateZ(0deg);
}
.isometricglow {
    filter: hue-rotate(90deg);
}

.el-tooltip__popper.is-light {
    color:black;
    font-family:微软雅黑;}
.el-popover{
    text-align:center;
    min-width:60px;
    height:30px;
    padding:3px;
    background:#eee;
}
</style>








