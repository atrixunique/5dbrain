<template>
    <el-main>
        <div class="asideimage" :style ="asideimage">
            <div style="height:125px"></div>
            <img src="./assets/images/new-image.png" width=340 style="cursor:pointer"/>

             <image-item v-for="(image, index) in images" class="blockimage" 
                v-bind:id="'CO'+image.id"
                :style="blockimage" 
                :class="{activeimage: isActive(index)}"
                :id="image.id" 
                :name="image.name" 
                :sha="image.sha" 
                :size="image.size" 
                :create="image.create"
                :key="image.id"
                @mouseover.native="setActive(index)"
                @click.native="imageClick(image.name)">
            </image-item>
            <div>位于其它节点上的镜像</div>
        </div>

        <div class="detailimage" :style ="detailimage">
        
            <image-detail 
                :body="attributes"
                class="blockimagedetail"
            >  
            </image-detail>
            
        </div>
        
        <div class="ribbonimage" :style ="ribbonimage" style="text-align:left;width:800px">
             <span style="position:relative;top:60px;left:40px;padding-right:120px;">镜像是一个只读的安全载荷容器模板，含有启动安全载荷容器所需的文件系统结构及其内容，因此是智能安全体系的基础资源。<br/>
            Images are fundamental resource for intelligent security framework, existed as read-only securiity workload container template, which contains file system structure and contents necessary to boot the container,</span>
        </div>

        <div class="tableimage" style="position:absolute;left:355px;top:305px;width:800px;height:220px;text-align:left;z-index:999">
                <div>镜像布署情况：
                    <el-button type="primary" icon="el-icon-plus">添加</el-button>
                    <el-button type="primary" icon="el-icon-share">拉取</el-button>
                    <el-button type="primary" icon="el-icon-delete">删除</el-button>
                </div>
                <el-table
                    :data="images"
                    
                    style="width: 100%;background-color:transparent !important;"
                    >
                    <el-table-column
                        prop="id"
                        label="ID"
                        align="center"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="NAME"
                        align="center"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="sha"
                        label="LABEL"
                        align="center"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="DISTRIBUTION"
                        align="left"
                        show-overflow-tooltip>
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px"><el-tag>{{scope.row.nodes}}</el-tag></span>
                            </template>
                    </el-table-column>
            </el-table>
        </div>

        <div class="divcanvas" style="position:absolute;top:300px;left:330px;z-index:0;width:1252px;height:750px;">
              <img src="./assets/images/entity-container.png" width=1000 style="left:-30px;top:180px"/>
            
               <el-tooltip class="item" effect="light" :content="'我是'+image.name" placement="top" v-for="(image, index) in images" v-bind:key="'SI'+image.id">
                    <img 
                        src="./assets/images/single-image.png" 
                        width=103
                        class="isometric-icon"
                        v-bind:class="{isometricglow:isActive(index)}"
                        v-bind:style="computeLeft(index, 'image')"
                        @mouseover="setActive(index)"
                        />
                </el-tooltip>
               
            
               <div v-for="(image, index) in images"
                class="isometric-div"
                v-bind:id="'LB'+image.id"
                v-bind:style="computeLeft(index ,'label')"
                > {{image.name}}
                
                </div>

        </div>
         <!--

             :class="{isometricglow:isActive(index)}"


        <canvas width="1252" height="750" id="myCanvas" style="position:absolute;top:300px;left:330px;z-index:0;" @mouseover="setActive" @mouseout="unsetActive">
              
               :top="(390-index*100*Math.cos(Math.PI/6*(-1)))+'px'"

        </canvas>
        -->
    </el-main>
</template>

<script>

import Vue from 'vue';
import Mock from 'mockjs';
import axios from 'axios';

import {getServiceIP, mockAll} from './mockdata.js';

Vue.component('image-item', {
  data() {
    return {
    }
  },
  props: ['id','name','sha','size','create','isActive'],
  template: '<div><div class="d-id">ID:{{id}}</div><div class="d-table"><table><tr><td>名称:</td><td>{{name}}</td></tr><tr><td>SHA</td><td>{{sha}}</td></tr><tr><td>大小</td><td>{{size}}</td></tr><tr><td>创建时间</td><td>{{create}}</td></tr></table></div></div>'
})

Vue.component('image-detail', {
  data() {
    return {
    }
  },
  props: ['body'],
  template:'<div><div class="s-sid">镜像：{{body.id}}</div><div class="s-id">{{body.id}}</div><div class="s-label">{{body.label}}</div><div class="s-created">{{body.created}}</div><div class="s-architecture">{{body.architecture}}</div><div class="s-os">{{body.os}}</div><div class="s-size">{{body.size}}</div><div class="s-sha">{{body.sha}}</div><div class="s-cmd">{{body.cmd}}</div></div>'
})

//  props: ['id', 'sha', 'os', 'architecture', 'cmd', 'created', 'size', 'label'],
//  template:'<div>详细信息列表<ol><li>id:{{id}}</li><li>sha:{{sha}}</li><li>os:{{os}}</li><li>镜像架构:{{architecture}}</li><li>cmd:{{cmd}}</li><li>created:{{created}}</li><li>size:{{size}}</li><li>label:{{label}}</li></ol></div>'

export default {
    name: 'imagemgmt',
    data() {
        return {
            images:[],
            attributes:{},
            activeImage:-1,
            asideimage: {
                backgroundImage: "url("+require("./assets/images/aside-image.png") + ")",
                position:"absolute",
                top:"50px",
                right:"0px",
                width:"340px",
                height:"1000px",
                paddingLeft:"4px"
            },
            blockimage: {
                backgroundImage: "url("+require("./assets/images/block-image.png") + ")",
                width:"340px",
                height:"110px"
            },
            detailimage: {
                backgroundImage: "url("+require("./assets/images/detail-image.png") + ")",
                position:"absolute",
                top:"520px",
                right:"340px",
                width:"340px",
                height:"495px",
                paddingLeft:"2px",
                zIndex:"10"
            },
            ribbonimage: {
                backgroundImage: "url("+require("./assets/images/ribbon-image.png") + ")",
                position:"absolute",
                left:"324px",
                top:"158px",
                width:"1257px",
                height:"153px"
            }
        }
     },
    methods:{
         imageClick:function(msg){
            //debugger;
            //alert(msg +' clicked!');
            var self=this;
            axios.get(getServiceIP()+"getImageDetail", {"name":msg}).then(function(response){
                self.attributes=response.data.body;
                
             });
        },
        computeLeft:function(index, op){
            
            var step=125;
            var startX=625, startY=380;
            if(op=="label") {startX=655;startY=500;}
            
            var l=(startX-index*step*Math.cos(Math.PI/6.0))+'';
            var t=(startY+index*step*Math.sin(Math.PI/6.0))+'';
            return {left: l +'px', top: t+'px'}
        },
        setActive:function(index){
            this.activeImage=index;
        },
        unsetActive:function(index){
            this.activeImage=-1;
        },
        isActive:function(index){
            //console.log('checkactive:'+index);
            if(this.activeImage==index) return true;
            return false;       
         }
    },
    mounted() {
        var self=this;
        mockAll();
        
        //create Image list
        console.log('[mounted] enter here');
        axios.get(getServiceIP()+"getImageList").then(function(response){    
            //console.log(response);
            self.images=response.data.body;
            self.imageClick("001");

            axios.get(getServiceIP()+"getImageDeployed").then(function(response){    
                
                response.data.body.forEach((item, index) => {
                    self.images[index].nodes=item.nodes;
                });
            });
            
        });
        
        //do some drawing
        /*
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var imgbg = new Image();
        imgbg.src = require("./assets/images/entity-container.png");
        imgbg.onload = function(){
            ctx.drawImage(imgbg, -20, 280);             
        };
        */
    }
    
 }



</script> 

<style>
.blockimage {text-align:left;font-size:13px;}
.blockimage div {position:relative;}
.blockimage:hover, .activeimage
{
    box-shadow:inset 0px 0px 8px #AAA;
    -webkit-filter: contrast(1.5);
    cursor: pointer;
}

.blockimage .d-id   { left:38px; top:78px; }
.blockimage .d-table { left:120px; top:-5px; }
.blockimage .d-table table td{width:70px;}

.blockimagedetail div   {position:relative;text-align:left;}
.blockimagedetail .s-sid      {left:30px; top:14px; }
.blockimagedetail .s-id       {left:75px; top:65px; text-align:center;}
.blockimagedetail .s-label    {left:73px; top:115px; text-align:center;}
.blockimagedetail .s-created  {left:97px; top:147px; }
.blockimagedetail .s-architecture {left:97px; top:162px; }
.blockimagedetail .s-os       {left:97px; top:178px; }
.blockimagedetail .s-size     {left:97px; top:195px; }
.blockimagedetail .s-sha      {left:97px; top:277px;width:220px; }
.blockimagedetail .s-cmd      {left:97px; top:286px; }

.divcanvas img {position:absolute;}
.isometric-icon {cursor:pointer; }
.isometric-div {
    position:absolute;
    width: 80px;
    text-align:center;
    background-color:darkblue;
	transform: rotateX(315deg) rotateY(35deg) rotateZ(0deg);
}
.isometricglow {
    filter: hue-rotate(90deg);
}
.el-tooltip__popper.is-light {
    color:black;
    font-family:微软雅黑;}
.el-table--border::after, .el-table--group::after, .el-table::before { background-color: transparent !important;}
.el-table tr, .el-table th, .cell {
  background-color: transparent !important;
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
</style>








