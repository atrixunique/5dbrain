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
                :key="node.domain"
                >
            </node-item>
            <div style="height:160px"></div>
            <img src="./assets/images/fake-event.png" width=340 style="cursor:pointer">
        </div>
        <div class="ribbonimage" :style ="ribbonimage" style="text-align:left;">
            <span style="position:relative;top:60px;left:40px;padding-right:140px;">事件管理从两个维度进行，在节点维度关注单一防护对象的安全状态，在性质维度关注某一特定风险在全局的分布情况。 <br/>
            <span style="font-size:80%;color:#999">Event management is implemented from two perspectives, the node viewpoint concern the security state of an individual object being protected, the feature viewpoint concern the distribution and propagation of certain kind of security risk.</span></span>
        </div>

        <div class="containerEntity" :style ="entitybackground">

            <img src="./assets/images/fake-chart.png" width=340 style="position:absolute;top:310px;left:1000px;">

        </div>
         <div style="position:absolute;width:1200px;height:290px;left:354px;top:310px;">
                <el-table
                    :data="events"
                    style="width: 100%;background-color:transparent !important;"
                    >
                    <el-table-column
                        prop="time"
                        label="时间"
                        align="center"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="sourceip"
                        label="源IP"
                        align="center"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="destip"
                        label="目的ip"
                        align="center"
                        width="150">
                    </el-table-column>
                     <el-table-column
                        prop="eventtype"
                        label="事件类型"
                        align="center"
                        width="150">
                    </el-table-column>
                     <el-table-column
                        prop="eventlevel"
                        label="紧急程度"
                        align="center"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="eventbrief"
                        label="事件摘要"
                        align="摘要"
                        width="420">
                    </el-table-column>
            </el-table>
        </div>

        <div class="mainDiv">
           
        </div>
        
    </el-main>
</template>

<script>
import Vue from 'vue';
import Mock from 'mockjs';
import axios from 'axios';

import {getServiceIP, mockAll} from './mockdata.js';
import {} from './commonfunc.js';

Vue.component('node-item', {
  data() {
    return {
    }
  },
  props: ['domain','ip','containers','images'],
  template: '<div><div class="d-domain">{{domain}}</div><div class="d-ip">{{ip}}</div><div class="d-containers">{{containers}}</div></div>'
})

export default {
    name: 'infomgmt',
    data() {
        return {
            nodes:[],
            events:[],
            ribbonimage: {
                backgroundImage: "url("+require("./assets/images/ribbon-info.png") + ")",
                position:"absolute",
                left:"324px",
                top:"158px",
                width:"1586px",
                height:"151px",
                backgroundRepeat:"no-repeat"
            },
            entitybackground: {
                backgroundImage: "url("+require("./assets/images/animated-turbine.gif") + ")",
                left:"190px",
                top:"474px",
                width:"790px",
                height:"694px",
                backgroundRepeat:"no-repeat"
            },
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
            formLabelWidth: '120px'
        }
     },
     methods:{

     },
     mounted() {
        var self=this;
        mockAll();

        self.events=Mock.mock({
            'results|10': [{
                'time': '@time',
                'sourceip':'@ip',
                'destip':'@ip',
                'eventtype':'@region',
                'eventlevel':'@cword(3)',
                'eventbrief':'@sentence'
            }]
        }).results;

        axios.get(getServiceIP()+"/cluster/list").then(function(response){    
            self.nodes=response.data.result;
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
.el-table--border::after, .el-table--group::after, .el-table::before { background-color: transparent !important;}
.el-table tr, .el-table th, .cell {
  background-color: transparent !important;
  color:#bde8ff;
  height:18px;
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








