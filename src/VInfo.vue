<template>
    <el-main>
         <el-dialog title="节点：10.42.0.133" :visible.sync="dialogNodeInfo" width="60%">
            
             显示一些关于该节点的信息

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogNodeInfo = false">确定</el-button>
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
                >
            </node-item>
            <div style="height:20px"></div>
            
            <canvas id="statChart1" width="400" height="220"></canvas>
            <div style="height:30px">网络安全事件统计</div>
            <canvas id="statChart2" width="400" height="220"></canvas>
            <div style="height:30px">网络安全事件统计</div>
            <canvas id="statChart3" width="400" height="220"></canvas>
            <div style="height:20px">网络安全事件统计</div>
 
        </div>

        <div class="ribbonimage" :style ="ribbonimage" style="text-align:left;width:800px">
            <div style="position:relative;top:20px;left:40px;font-size:20px;font-weight:bold">信息管理</div>
            <span style="position:relative;top:35px;left:65px;display:block;padding-right:80px;">信息管理从两个维度进行，在节点维度关注单一防护对象的安全状态，在性质维度关注某一特定风险在全局的分布情况。
            <br/>
            <span style="font-size:80%;color:#999;">
            Event management is implemented from two perspectives, the node viewpoint concern the security state of an individual object being protected, the feature viewpoint concern the distribution and propagation of certain kind of security risk.</span></span>
        </div>

        <!--
        <div class="containerEntity" :style ="entitybackground">
            <img src="./assets/images/fake-chart.png" width=340 style="position:absolute;top:310px;left:1000px;">
        </div> -->

    


         <div style="position:absolute;width:1200px;height:290px;left:354px;top:310px;">

            <div style="width:100%;margin:0px 20px;height:40px;opacity:0.8;text-align:left;">

                <el-switch
                        v-model="showFW"
                        active-text="防火墙日志">
                </el-switch>
                <el-switch
                        v-model="showHP"
                        active-text="蜜罐日志">
                </el-switch>
                <el-switch
                        v-model="showHM"
                        active-text="主机日志">
                </el-switch>
                <span class="demonstration">时间范围：&nbsp;</span>
                 <el-date-picker
                    v-model="value5"
                    type="datetimerange"
                    :picker-options="pickerOptions2"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    align="right">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
                <el-button type="primary" icon="el-icon-upload">重置</el-button>
            </div>

                <el-table
                    :data="firewallMongoLogger.slice((currentPage-1)*pageSize, currentPage*pageSize).concat(conpotMongoLogger.slice((currentPage-1)*pageSize, currentPage*pageSize))"
                    style="width: 100%;background-color:transparent !important;"
                    @cell-mouse-enter="table_hover"
                    >
                    <el-table-column
                        prop="report_time"
                        label="时间"
                        align="center"
                        width="160">
                    </el-table-column>
                    <el-table-column
                        prop="src_info"
                        label="源IP"
                        align="center"
                        width="190">
                        <template slot-scope="scope">
                            <span v-if="scope.row.src_info">
                                <el-tag><strong style="color:#bde8ff">{{scope.row.src_info.split(" ")[0]+"&nbsp;:&nbsp;"}}</strong>{{scope.row.src_info.split(" ")[1]}}</el-tag>
                            </span>
                            <span v-if="scope.row.src_ip">
                                <el-tag><strong style="color:#bde8ff">{{scope.row.src_ip+"&nbsp;:&nbsp;"}}</strong>{{scope.row.src_port}}</el-tag>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="dst_info"
                        label="目的ip"
                        align="center"
                        width="190">
                        <template slot-scope="scope">
                            <span v-if="scope.row.dst_info">
                                <el-tag><strong style="color:#bde8ff">{{scope.row.dst_info.split(" ")[0]+"&nbsp;:&nbsp;"}}</strong>{{scope.row.dst_info.split(" ")[1]}}</el-tag>
                            </span>
                            <span v-if="scope.row.dst_ip">
                                <el-tag><strong style="color:#bde8ff">{{scope.row.dst_ip+"&nbsp;:&nbsp;"}}</strong>{{scope.row.data_type}}</el-tag>
                            </span>
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="HTTP_info"
                        label="事件类型"
                        align="center"
                        width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.HTTP_info">{{scope.row.HTTP_info}}</span>
                            <span v-if="scope.row.data_type">{{scope.row.data_type}}</span>
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="severity"
                        label="紧急程度"
                        align="center"
                        width="150">
                        <template slot-scope="scope">一般</template>
                    </el-table-column>
                    <el-table-column
                        prop="timestamp_original"
                        label="事件摘要"
                        align="摘要"
                        width="320">
                        <template slot-scope="scope">
                            <span v-if="scope.row.timestamp_original">{{scope.row.timestamp_original}}</span>
                            <span v-if="scope.row.timestamp">{{scope.row.timestamp}}</span>
                        </template>
                    </el-table-column>
            </el-table>
             <div style="width:94%;margin:0px 20px;height:40px;opacity:0.8;text-align:right;margin-top:20px;">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="totalItem"
                    @current-change="page_change">
                </el-pagination>
            </div>
             <div class="entityevent" :style ="entityevent" style="position:relative;margin:0px 20px;text-align:center;margin-top:20px;">

                 <img v-if="eventDetail.img=='fw'" style="position:absolute;left:20px;top:52px;" src="./assets/images/event-icon-fw.png" width=100/>
                 <img v-if="eventDetail.img=='hp'" style="position:absolute;left:20px;top:52px;" src="./assets/images/event-icon-hp.png" width=100/>

                <div style="position:absolute;left:287px;top:76px">{{eventDetail.time}}</div>

                <div style="position:absolute;left:287px;top:116px">{{eventDetail.src}}</div>

                <div style="position:absolute;left:287px;top:156px">{{eventDetail.dest}}</div>

                <div style="position:absolute;left:610px;top:76px">{{eventDetail.protocol}}</div>

                <div style="position:absolute;left:610px;top:116px">{{eventDetail.result}}</div>

                <div style="position:absolute;left:610px;top:156px">{{eventDetail.urgent}}</div>


            </div>
            

        </div>
   
    </el-main>
</template>

<script>
import Vue from 'vue';
import Mock from 'mockjs';
import axios from 'axios';
import Chart from 'chart.js';

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
                backgroundImage: "url("+require("./assets/images/ribbon.png") + ")",
                position:"absolute",
                left:"324px",
                top:"158px",
                width:"1257px",
                height:"153px"
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
            entityevent: {
                backgroundImage: "url("+require("./assets/images/info-event.png") + ")",
                width:"1150px",
                height:"238px"
            },
            formLabelWidth: '120px',
            showFW:true,
            showHP:true,
            showHM:true,
            totalItem:100,
            currentPage:1,
            pageSize:5,
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            value5:'',
            dialogNodeInfo:false,
            firewallMongoLogger:[],
            conpotMongoLogger:[],
            eventDetail:{
                time:'',
                src:'',
                dest:'',
                protocol:'',
                result:'',
                urgent:'',
                img:''
            }
        }
     },
     methods:{
         
         page_change:function(curPage){
             this.currentPage=curPage;
         },
         table_hover:function(row, column, cell, event){

            this.eventDetail.time=row.report_time;
             
            if(row.src_info) this.eventDetail.src=row.src_info;
            else this.eventDetail.src=row.src_ip+" "+row.src_port;

            if(row.dst_info) this.eventDetail.dest=row.dst_info;
            else this.eventDetail.dest=row.dst_ip+" 80";

            if(row.src_info)   
                this.eventDetail.img="fw";
            else
                this.eventDetail.img="hp";


            this.eventDetail.protocol="http";
            this.eventDetail.result="Success";
            this.eventDetail.urgent="一般";

         }
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

        axios.get(getServiceIP()+"/logger/searchfirewall").then(function(response){    
            self.totalItem=response.data.pageCount*30;
            self.firewallMongoLogger=response.data.firewallMongoLogger;
        });

        axios.get(getServiceIP()+"/logger/searchconpot").then(function(response){
            self.conpotMongoLogger=response.data.conpotMongoLogger;
        });
        
        Chart.defaults.global.defaultFontColor = 'lightgray';
        var ctx = document.getElementById("statChart1").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                legend:{
                    display:false
                }
            }
        });
        var ctx2 = document.getElementById("statChart2").getContext('2d');
        var myChart2 = new Chart(ctx2, {
                type:'line',
				data: {
                    labels: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00'],
                    datasets: [{
                        label: 'My First dataset',
                        backgroundColor: 'black',
                        borderColor:  'red',
                        data: [
                            45,67,34,26,43,65,34
                        ],
                        fill: false,
                    }, {
                        label: 'My Second dataset',
                        fill: false,
                        backgroundColor:  'black',
                        borderColor:  'blue',
                        data: [
                            65,31,76,42,38,65,32
                        ],
                    }]
                },
				options: {
					responsive: true,
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Month'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Value'
                            }
                        }]
                    },
                    legend:{
                        display:false
                    }
				}
            });
            var ctx3 = document.getElementById("statChart3").getContext('2d');
            var myChart3 = new Chart(ctx3, {
                    type:'polarArea',
                    data: {
                        datasets: [{
                            data: [
                                75,65,86,76,84
                            ],
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(32, 162, 76, 0.2)',
                                'rgba(162, 54, 235, 0.2)',
                                'rgba(54, 56, 162, 0.2)',
                                'rgba(162, 54, 32, 0.2)'
                            ],
                            label: 'My dataset' // for legend
                        }],
                        labels: [
                            'SQL Inject',
                            'Stack Overflow',
                            'Phishing',
                            'DDos',
                            'Fake Cert'
                        ]
                    },
                    options: {
                       responsive: true,
                        legend: {
                            position: 'right',
                        },
                        scale: {
                            ticks: {
                                beginAtZero: true
                            },
                            reverse: false
                        },
                        animation: {
                            animateRotate: false,
                            animateScale: true
                        }
                    }
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

.el-switch {
    margin-left:10px;
}
.demonstration { font-size:14px;color: #409EFF;margin-left:40px;}
.el-input__inner {
    background-color:#1e62a9;
    border: 1px solid #7295e6;
    }
.el-picker-panel {color:gray;}

.el-dialog__header {
    background-color:#3a8ee6;
    border-bottom:1px solid #1d36b1;
    height:30px;
    padding:5px 20px 0px;
    }
.el-dialog__title {color:white;}


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
.current-row td{background-color:#3b629e !important;opacity:0.8;}
</style>