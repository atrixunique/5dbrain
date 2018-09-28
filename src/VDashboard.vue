<template>
    <el-main style="height:auto">
        <el-dialog title="新增被管节点" :visible.sync="dialogNewNodeVisible" width="30%">
            <el-form :model="formNewNode">
                <el-form-item label="节点名称" :label-width="formLabelWidth">
                    <el-input v-model="formNewNode.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="节点IP" :label-width="formLabelWidth">
                    <el-input v-model="formNewNode.ip" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="节点root用户名" :label-width="formLabelWidth">
                    <el-input v-model="formNewNode.user" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="节点root用户密码" :label-width="formLabelWidth">
                    <el-input v-model="formNewNode.pass" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogNewNodeVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogNewNodeVisible = false">添加</el-button>
            </div>
        </el-dialog>


        <div class="ribbonimage" :style ="ribbonimage" style="text-align:left;width:800px">
            <div style="position:relative;top:20px;left:40px;font-size:20px;font-weight:bold">防御首页</div>
            <span style="position:relative;top:35px;left:65px;display:block;padding-right:80px;">防御脑是人工智能应用于网络空间防御多元目标的深刻实践，通过生能、聚能、赋能、释能机制，实现安全能力的精准投送和攻击面的全局管理。
            <br/>
            <span style="font-size:80%;color:#999;">
            Defense Brain is an active component of 5D brain, that profoundly apply dynamic and intelligent mechanism into cyberspace defense practice by generating, aggregating, enabling and discharging energy, to overwhelmingly  achineve attacking surface management and exact security abilities delivery.</span></span>
        </div>

        <div class="containerEntity" :style ="entitybackground">
           
            <div style="position:absolute;width:345px;height:130px;left:515px;top:0px">
                 <img src="./assets/images/small-gauge.png" width=300></img>
            </div>

            <div style="position:absolute;width:345px;height:130px;left:5px;top:45px">
                <div style="width:50%;float:left;margin:10px 0px 0px -20px">
                    <img src="./assets/images/small-rules.png" width=230></img>
                </div>
                <div style="width:50%;float:right">
                    <ul style="text-align:left;font-size:12px">
                        <li>规则总数：<el-tag>151</el-tag></li>
                        <li>漏洞规则：<el-tag type="warning">102</el-tag></li>
                        <li>异常规则：<el-tag type="danger">38</el-tag></li>
                        <li>其它规则：<el-tag tyle="info">11</el-tag></li>
                    </ul>
                </div>
            </div>

            <div style="position:absolute;width:345px;height:130px;left:1150px;top:45px">
                  
                <div style="width:50%;float:left;">
                    <ul style="text-align:left;font-size:12px">
                        <li>安全事件总数：<el-tag>48</el-tag></li>
                        <li>待处置：<el-tag type="warning">2</el-tag></li>
                        <li>已处置：<el-tag type="danger">38</el-tag></li>
                        <li>正在处置：<el-tag tyle="info">7</el-tag></li>
                    </ul>
                </div>
                <div style="width:50%;float:left;margin:5px 0px 0px 0px">
                    <img src="./assets/images/small-rules.png" width=230></img>
                </div>
            </div>

            <div style="position:absolute;width:345px;height:290px;left:40px;top:370px;">
                <p>当前管理节点总数：3</p>
                <el-table
                    :data="nodes"
                    style="width: 100%;background-color:transparent !important;"
                    @cell-mouse-enter="handleMouseEnter"
                    @cell-mouse-leave="handleMouseOut"
                    >
                    <el-table-column
                        prop="domain"
                        label="名称"
                        align="center"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="ip"
                        label="IP"
                        align="center"
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="containers"
                        label="容器"
                        align="center"
                        width="50">
                    </el-table-column>
                     <el-table-column
                        prop="images"
                        label="镜像"
                        align="center"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        label="管理"
                        align="center"
                        width="50">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="light" :content="'删除'+scope.$index+'条记录'" placement="top">
                                <el-button type="text" icon="el-icon-delete"></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
            </el-table>
            <el-button type="primary" icon="el-icon-plus" size="small" style="margin-top:5px" @click="dialogNewNodeVisible=true" >增加节点</el-button>
            </div>

            <img v-for="(image, index) in nodes"
                class="isometric-node"
                v-bind:id="'LN'+index"
                v-bind:style="computeLeft(index ,'node')"
                v-bind:class="{isometricglow:isActive(image.domain)}"
                src="./assets/images/small-node.png" 
                > 
                
            </img>

            <div style="position: absolute;width: 345px;height: 132px;left: 1240px;top:346px;font-size: 12px;">
                <p>镜像源镜像数：{{imageCount}}</p>
            </div>

            <div style="position:absolute;width:345px;height:132px;left:1122px;top:370px;">
                
                <el-table
                    :data="images"
                    style="width: 100%;background-color:transparent !important;"
                    >
                    <el-table-column
                        prop="name"
                        label="镜像名称"
                        align="left"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        label="TAG"
                        align="center"
                        width="140">
                        <template slot-scope="scope">
                                <span v-for="version in scope.row.tags" style="margin-left: 5px">
                                    <el-tag>{{version}}</el-tag>
                                </span>
                            </template>
                    </el-table-column>
                </el-table>
            </div>

                
        </div>


    </el-main>

</template>


<script>

import Vue from 'vue';
import Mock from 'mockjs';
import axios from 'axios';

import {getServiceIP, mockAll} from './mockdata.js';

export default {
    name: 'imagemgmt',
    data() {
        return {
            nodes:[],
            images:[],
            activeNode:"",
            dialogNewNodeVisible:false,
            formNewNode: {
                name:'',
                ip:'',
                user:'',
                pass:''
            },
            ribbonimage: {
                backgroundImage: "url("+require("./assets/images/ribbon.png") + ")",
                position:"absolute",
                left:"324px",
                top:"158px",
                width:"1257px",
                height:"153px"
            },
            entitybackground: {
                backgroundImage: "url("+require("./assets/images/entity-landing.png") + ")",
                left:"380px",
                top:"330px",
                width:"1500px",
                height:"694px"
            },
            formLabelWidth: '160px',
            imageCount:0
        }
     },
    methods:{
        computeLeft:function(index, op){
            
            var step=60;
            var startX=555, startY=420;
            if(op=="label") {startX=655;startY=500;}
            
            var l=(startX-index*step*Math.cos(Math.PI/6.0))+'';
            var t=(startY+index*step*Math.sin(Math.PI/6.0))+'';
            return {left: l +'px', top: t+'px'}
        },
        handleMouseEnter:function(row, column, cell, event){
          this.activeNode=row.domain;
          console.log("enter+"+row);
        },
        handleMouseOut:function(row, column, cell, event){
          this.activeNode="";
        },
        isActive:function(domain){
            if(this.activeNode==domain) return true;
            return false;       
        }

    },
    mounted() {
        var self=this;
        mockAll();
        this.$root.eventHub.$emit('command-log', {text: "Dashboard Overseeing Interface", type: "info"});
        
        axios.get(getServiceIP()+"/cluster/list").then(function(response){    
            //console.log(response);
            self.nodes=response.data.result;
           
        });
        axios.get(getServiceIP()+"/action/listimages").then(function(response){    
            //console.log(response);
            self.images=response.data.repositories;
            self.imageCount=self.images.length;
        });
        
    }
   
 }
</script>

<style>
.isometric-node{
    position:absolute;
    cursor:pointer;
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