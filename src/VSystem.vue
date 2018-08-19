<template>
    <el-main>
        
        <div class="ribbonimage" :style ="ribbonimage" style="text-align:left;">
            <span style="position:relative;top:60px;left:40px;padding-right:140px;">系统管理包括基本设置、镜像设置、容器设置、事件设置、其它设置等几个有机组成部分。 <br/>
            <span style="font-size:80%;color:#999">System management is composed of a series of parameters such as basic config, image config, container config, events config and misc config..</span></span>
        </div>

        <div class="containerEntity" :style ="entitybackground">
        </div>

        <div class="mainDiv">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i>基本设置</span>
                    <el-form ref="formBasic" :model="formBasic" label-width="80px">
                        <el-form-item :label-width="formLabelWidth" label="活动名称：">
                            <el-input v-model="formBasic.name"></el-input>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="活动区域：">
                            <el-select v-model="formBasic.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="活动时间：">
                            <el-col :span="10">
                            <el-date-picker type="date" placeholder="选择日期" v-model="formBasic.date1" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="4" style="text-align:center">——————</el-col>
                            <el-col :span="10">
                            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="formBasic.date2" style="width: 100%;"></el-time-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="即时配送：">
                            <el-switch v-model="formBasic.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="活动性质：">
                            <el-checkbox-group v-model="formBasic.type">
                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                            <el-checkbox label="地推活动" name="type"></el-checkbox>
                            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="特殊资源：">
                            <el-radio-group v-model="formBasic.resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="活动形式：">
                            <el-input type="textarea" v-model="formBasic.desc" 
                            placeholder="请输入内容" :rows="10"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">立即创建</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                        </el-form>
                </el-tab-pane>
                <el-tab-pane>
                     <span slot="label"><i class="el-icon-time"></i>镜像管理</span>
                    
                    
                     <el-form ref="formBasic" :model="formImage" label-width="80px">
                        <el-form-item :label-width="formLabelWidth" label="活动形式：">
                             <el-radio-group v-model="formBasic.resource">
                                <el-radio label="线上品牌商赞助"></el-radio>
                                <el-radio label="线下场地免费"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>



                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-share"></i>容器设置</span>
                    角色管理
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-phone"></i>事件设置</span>
                    定时任务补偿
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-star-off"></i>其它设置</span>
                    定时任务补偿
                </el-tab-pane>
            </el-tabs>
        </div>
        
    </el-main>
</template>

<script>
import Vue from 'vue';
import Mock from 'mockjs';
import axios from 'axios';

import {getServiceIP, mockAll} from './mockdata.js';
import {} from './commonfunc.js';

export default {
    name: 'systemmgmt',
    data() {
        return {
            ribbonimage: {
                backgroundImage: "url("+require("./assets/images/ribbon-system.png") + ")",
                position:"absolute",
                left:"324px",
                top:"158px",
                width:"1586px",
                height:"151px"
            },
            entitybackground: {
                backgroundImage: "url("+require("./assets/images/entity-system.png") + ")",
                left:"1270px",
                top:"354px",
                width:"600px",
                height:"694px",
                backgroundRepeat:"no-repeat"
            },
            formBasic: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formImage:{},
            formLabelWidth: '120px'
        }
     },
     methods:{

     },
     mounted() {
       

        
    }
}
</script>

<style>
.mainDiv{
    position:absolute;
    left:360px;
    top:310px;
    width:1000px;
    height:602px;
}
.mainDiv i{
    margin-right:10px;
}
.el-tabs--border-card
{
    background:transparent;
    border:1px solid #7586af;
}
.el-tabs--border-card > .el-tabs__header{
    background-color:#1e3558;
    opacity:0.7;
    border-bottom: 1px solid #7586af;
}
.el-tabs--border-card >.el-tabs__header .el-tabs__item
{
    color:white;
}
.el-form-item__label, .el-radio, .el-checkbox{
    color:white;
}
.el-form-item__content {
    text-align:left;
}

</style>








