<template>
    <el-main>
        <el-dialog title="拉取镜像" :visible.sync="dialogPullImageVisible" width="30%">
            <el-form :model="formPullImage" style="text-align:left">

                <el-form-item label="目标节点：" :label-width="formLabelWidth">
                    <el-select v-model="formPullImage.nodeName">
                        <el-option v-for ="node in nodes" :label="node.domain" :key="'opn_'+node.domain" :value="node.domain" :selected="0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="镜像名：" :label-width="formLabelWidth">
                    <el-select v-model="formPullImage.imageName" @change="changeImage">
                        <el-option v-for ="image in sourceimages" :label="image.name" :key="'opi_'+image.name" :value="image.name"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="版本：" :label-width="formLabelWidth">
                    <el-select v-model="formPullImage.version">
                        <el-option v-for ="version in versions" :label="version" :key="'opv_'+version" :value="version"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPullImageVisible = false">取消</el-button>
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
                    <span>共{{selectedTotal}}镜像</span>
                </div>

                <!--- Display images on node -->
                <div style="position:absolute;left:5px;top:135px;height:330px;width:320px;">
                    <el-popover
                        placement="bottom"
                        width="80"
                        height="60"
                        trigger="hover"
                        v-for="(image, index) in nodeimages" 
                        :key="image.Id"
                        >
                        <el-button type='text' size="small" @click="viewImageDetail(index)">
                            详情
                        </el-button>
                        <el-button type='text' size="small" @click="deleteContainer(index)">
                            删除
                        </el-button>

                        <node-badge
                                v-bind:id="'NB'+image.Id" 
                                slot="reference"
                                :name="image.RepoTags" 
                                :typeimg="getImageClass(image.RepoTags)"
                                @click.native="viewImageDetail(index)"
                                >
                            </node-badge>
                    </el-popover>
                </div>

            </div>

            <div>
                <img src="./assets/images/new-image.png" width=340 style="cursor:pointer" @click="dialogPullImageVisible=true"/>
            </div>
        </div>
        <!-- Detail info listed for a certain container -->
        <div id="detailDiv" class="detailimage" 
            :style ="detailimage" 
            >
        </div>

        <div class="ribbonimage" :style ="ribbonimage" style="text-align:left;width:800px">
            <div style="position:relative;top:20px;left:40px;font-size:20px;font-weight:bold">镜像管理</div>
            <span style="position:relative;top:35px;left:65px;display:block;padding-right:80px;">镜像是一个只读的安全载荷容器模板，含有启动安全载荷容器所需的文件系统结构及其内容，因此是智能安全体系的基础资源。
            <br/>
            <span style="font-size:80%;color:#999;">
           Images are fundamental resource for intelligent security framework, existed as read-only securiity workload container template, which contains file system structure and contents necessary to boot the container.</span></span>
        </div>



        <div class="containerEntity" :style ="entitybackground">
            <div style="position:absolute;width:440px;height:202px;left:159px;top:30px;overflow-x:hidden;overflow-y:auto">
                <el-table
                    :data="sourceimages"
                    style="width: 100%;background-color:transparent !important;"
                    >
                    <el-table-column
                        prop="name"
                        label="名称"
                        align="left"
                        width="185">
                    </el-table-column>
                    <el-table-column
                        label="TAG"
                        align="left"
                        width="180">
                        <template slot-scope="scope">
                                <span v-for="version in scope.row.tags" style="margin-left: 5px">
                                    <el-tag>{{version}}</el-tag>
                                </span>
                            </template>
                    </el-table-column>
                    <el-table-column
                        label="ACITON"
                        align="center"
                        width="70">
                            <template slot-scope="scope">
                                <el-button type="text" icon="el-icon-download"
                                @click="dialogPullImageVisible = true"                  
                                ></el-button>
                             </template>
                    </el-table-column>
                </el-table>
            </div>
                     
        </div>
        <img v-for="(node, index) in nodes"
            class="isometric-node" 
            v-bind:id="'LN'+index"
            v-bind:style="computeLeft(index ,'node')"
            v-bind:class="{isometricglow:isActive(index)}"
            src="./assets/images/big-node.png"
            @click="nodeClick(index, node.domain)"
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
  template: '<div class="badge-item" :style="typeimg"><span>{{name}}</span></div>'
})

export default {
    name: 'imagemgmt',
    data() {
        return {
            nodes:[],
            nodeimages:[],
            sourceimages:[],
            formPullImage:{
                nodeName:'',
                imageName:'',
                version:''
            },
            versions:[],
            activeNode:-1,
            selectedNode:-1,
            selectedIP:'',
            selectedTotal:0,
            dialogPullImageVisible:false,
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
                backgroundImage: "url("+require("./assets/images/entity-image.png") + ")",
                left:"280px",
                top:"320px",
                width:"1100px",
                height:"668px"
            },
            ribbonimage: {
                backgroundImage: "url("+require("./assets/images/ribbon.png") + ")",
                position:"absolute",
                left:"324px",
                top:"158px",
                width:"1257px",
                height:"153px"
            },
            detailimage: {
                backgroundImage: "url("+require("./assets/images/detail-image.png") + ")",
                position:"absolute",
                top:"520px",
                right:"340px",
                width:"340px",
                height:"495px",
                paddingLeft:"2px",
                zIndex:"10",
                opacity:0
            },
            containercontainer: {
                backgroundImage: "url("+require("./assets/images/container-container.png") + ")"
            },
            imagenullclass:{
                backgroundImage: "url("+require("./assets/images/image-null.png") + ")"
            },
            formLabelWidth: '100px',
            divShown:false
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
            this.selectedNode=index;

            axios.defaults.headers.post['Content-Type'] = 'application/json';
            axios({
                method: 'post',
                url:getServiceIP()+"/docker/listimage",
                data:'{"nodename":"'+domain+'"}'
            }).then((response)=>{

                self.nodeimages=response.data.images;

                self.selectedIP=self.nodes[self.selectedNode].ip;
                self.selectedTotal=self.nodeimages.length;

                self.$root.eventHub.$emit('command-log', {text: "Select Node "+index, type: "info"});
            });
        },
        changeImage:function()
        {
            var self=this;
            //console.log("change image!");
            for(var i=0;i<self.sourceimages.length;i++){
                if(self.sourceimages[i].name == self.formPullImage.imageName) {
                    self.versions=self.sourceimages[i].tags;
                    if(self.versions.length) self.formPullImage.version=self.versions[0]; 
                    break;
                }
            }
        },
        getImageClass:function(msg){
            if(msg=="sha256:fw") return this.imagenullclass;
            else if(msg=="sha256:hp") return this.imagenullclass;
            else return this.imagenullclass;
            
        },
        viewImageDetail:function(index){
            //alert("start"+index);
            var self=this;
            this.$message({
                message: '节点x上的容器'+index+'正在启动中'
            });
            
            if(self.divShown==false) {
                self.divShown=true;
                var elm=document.getElementById("detailDiv");
                elm.classList.add("enableLeft");
                void elm.offsetWidth;
            }
            else {
                var elm=document.getElementById("detailDiv");
                elm.classList.remove("enableRight");
                void elm.offsetWidth;
                elm.classList.add("enableRight");
            }

            this.$message({
                message: '启动成功',
                type: 'success'
            });
        },
        resetAnimation:function(){
            var elm=document.getElementById("detailDiv");
            elm.classList.remove("enableRight");
            void elm.offsetWidth;
            this.animationRight=false;
            //var newone = elm.cloneNode(true);
            //elm.parentNode.replaceChild(newone, elm);
        },
        deleteContainer:function(index){
            this.$confirm('此操作将永久删除该镜像, 是否继续?', '提示', {
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
            self.dialogPullImageVisible=false;
            //alert(1);
            self.$message({
                message: '已在'+self.formPullImage.nodeName+'添加容器'+self.formPullImage.containerName,
                type: 'success'
            });
        }
     },
     mounted() {
        var self=this;
        mockAll();

        //clog("System Started", "info");
        this.$root.eventHub.$emit('command-log', {text: "Image Management Interface", type: "info"});

        axios.get(getServiceIP()+"/cluster/list").then(function(response){    
            //console.log(response);
            self.nodes=response.data.result;
            if(self.nodes.length) self.formPullImage.nodeName=self.nodes[0].domain;           
        });
        
        axios.get(getServiceIP()+"/action/listimages").then(function(response){    
            //console.log(response);
            self.sourceimages=response.data.repositories; 
            if(self.sourceimages.length) self.formPullImage.imageName=self.sourceimages[0].name;
            self.changeImage();
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
    font-size: 10px;
    line-height: 10px;
    width: 72px;
    word-wrap: break-word;
    display: block;
    padding-top: 12px;
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
.el-table--border::after, .el-table--group::after, .el-table::before { background-color: transparent !important;}
.el-table tr, .el-table th, .cell {
  background-color: transparent !important;
  height:20px;
  color:#bde8ff;
}
.el-table td, .el-table th.is-leaf{
    border-bottom-color: #006AA7 !important;
    border-bottom:1px solid #006AA7;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color:#222 !important;
    opacity: 0.7;
}


@keyframes fadeInDetail {
  from {
    opacity: 0;
    transform: translate3d(120%, 0, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes fadeOutDetail {
  0% {
    opacity: 1;
    transform: none;
  }
  50% {
    opacity: 0;
    transform: translate3d(120%, 0, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.enableLeft{
    -webkit-animation: fadeInDetail 0.6s;
    animation-fill-mode:both;
}
.enableRight{
    -webkit-animation: fadeOutDetail 0.6s;
    animation-fill-mode:both;
}

</style>








