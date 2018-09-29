<template>
    <el-main>
        <div class="asideimage" :style ="asideimage">
            <div style="height:125px"></div>
            <img src="./assets/images/new-rule.png" width=340 style="cursor:pointer"/>
            <p>决策事件数据结构：</p>
            <ol style="font-size:14px;text-align:left">
                <li>事件ID(id:long)；</li>
                <li>事件报告时间(report_time:string)；</li>
                <li>事件节点连边关系(relationship:object)；</li>
                <li>事件目标节点地址(dst_info:string)；</li>
                <li>事件源节点地址(src_info:string)；</li>
                <li>事件时间戳(timestamp:string)；</li>
                <li>事件原始时间戳(timestamp_oringinal:string)；</li>
                <li>事件蜜罐地址(host_ip:string)；</li>
                <li>事件协议信息(HTTP_info:string)；</li>
                <li>事件安全详细信息(sec_info:object):</li>
            </ol> 
            <p>规则描述文本：</p>
            <textarea readonly=false style="width:90%;height:500px;font-size:10px;background-color:black;color:white;">
                SecRule REQUEST_URI_RAW|REQUEST_BODY|REQUEST_HEADERS|!REQUEST_HEADERS:Referer|XML:/* "@rx (?i)(?:\x5c|(?:%(?:c(?:0%(?:[2aq]f|5c|9v)|1%(?:[19p]c|8s|af))|2(?:5(?:c(?:0%25af|1%259c)|2f|5c)|%46|f)|(?:(?:f(?:8%8)?0%8|e)0%80%a|bg%q)f|%3(?:2(?:%(?:%6|4)6|F)|5%%63)|u(?:221[56]|002f|EFC8|F025)|1u|5c)|0x(?:2f|5c)|\/))(?:%(?:(?:f(?:(?:c%80|8)%8)?0%8|e)0%80%ae|2(?:(?:5(?:c0%25a|2))?e|%45)|u(?:(?:002|ff0)e|2024)|%32(?:%(?:%6|4)5|E)|c0(?:%[256aef]e|\.))|\.(?:%0[01]|\?)?|\?\.?|0x2e){2}(?:\x5c|(?:%(?:c(?:0%(?:[2aq]f|5c|9v)|1%(?:[19p]c|8s|af))|2(?:5(?:c(?:0%25af|1%259c)|2f|5c)|%46|f)|(?:(?:f(?:8%8)?0%8|e)0%80%a|bg%q)f|%3(?:2(?:%(?:%6|4)6|F)|5%%63)|u(?:221[56]|002f|EFC8|F025)|1u|5c)|0x(?:2f|5c)|\/))" \
                "id:930100,\
                phase:2,\
                block,\
                capture,\
                t:none,\
                msg:'Path Traversal Attack (/../)',\
                logdata:'Matched Data: %{TX.0} found within %{MATCHED_VAR_NAME}: %{MATCHED_VAR}',\
                tag:'application-multi',\
                tag:'language-multi',\
                tag:'platform-multi',\
                tag:'attack-lfi',\
                tag:'OWASP_CRS/WEB_ATTACK/DIR_TRAVERSAL',\
                ver:'OWASP_CRS/3.1.0',\
                severity:'CRITICAL',\
                setvar:'tx.msg=%{rule.msg}',\
                setvar:'tx.anomaly_score_pl1=+%{tx.critical_anomaly_score}',\
                setvar:'tx.lfi_score=+%{tx.critical_anomaly_score}',\
                setvar:'tx.%{rule.id}-OWASP_CRS/WEB_ATTACK/DIR_TRAVERSAL-%{matched_var_name}=%{matched_var}'"

            #
            # [ Decoded /../ Payloads ]
            #
            SecRule REQUEST_URI|REQUEST_BODY|REQUEST_HEADERS|!REQUEST_HEADERS:Referer|XML:/* "@pm ..\ ../" \
                "id:930110,\
                phase:2,\
                block,\
                capture,\
                t:none,t:utf8toUnicode,t:urlDecodeUni,t:removeNulls,t:cmdLine,\
                msg:'Path Traversal Attack (/../)',\
                logdata:'Matched Data: %{TX.0} found within %{MATCHED_VAR_NAME}: %{MATCHED_VAR}',\
                tag:'application-multi',\
                tag:'language-multi',\
                tag:'platform-multi',\
                tag:'attack-lfi',\
                tag:'OWASP_CRS/WEB_ATTACK/DIR_TRAVERSAL',\
                ver:'OWASP_CRS/3.1.0',\
                severity:'CRITICAL',\
                multiMatch,\
                setvar:'tx.msg=%{rule.msg}',\
                setvar:'tx.anomaly_score_pl1=+%{tx.critical_anomaly_score}',\
                setvar:'tx.lfi_score=+%{tx.critical_anomaly_score}',\
                setvar:'tx.%{rule.id}-OWASP_CRS/WEB_ATTACK/DIR_TRAVERSAL-%{matched_var_name}=%{matched_var}'"

            #
            # -=[ OS File Access ]=-
            #
            # Ref: https://github.com/lightos/Panoptic/blob/master/cases.xml
            #
            SecRule REQUEST_COOKIES|!REQUEST_COOKIES:/__utm/|REQUEST_COOKIES_NAMES|ARGS_NAMES|ARGS|XML:/* "@pmf lfi-os-files.data" \
                "id:930120,\
                phase:2,\
                block,\
                capture,\
                t:none,t:utf8toUnicode,t:urlDecodeUni,t:normalizePathWin,t:lowercase,\
                msg:'OS File Access Attempt',\
                logdata:'Matched Data: %{TX.0} found within %{MATCHED_VAR_NAME}: %{MATCHED_VAR}',\
                tag:'application-multi',\
                tag:'language-multi',\
                tag:'platform-multi',\
                tag:'attack-lfi',\
                tag:'OWASP_CRS/WEB_ATTACK/FILE_INJECTION',\
                tag:'WASCTC/WASC-33',\
                tag:'OWASP_TOP_10/A4',\
                tag:'PCI/6.5.4',\
                ver:'OWASP_CRS/3.1.0',\
                severity:'CRITICAL',\
                setvar:'tx.msg=%{rule.msg}',\
                setvar:'tx.lfi_score=+%{tx.critical_anomaly_score}',\
                setvar:'tx.anomaly_score_pl1=+%{tx.critical_anomaly_score}',\
                setvar:'tx.%{rule.id}-OWASP_CRS/WEB_ATTACK/FILE_INJECTION-%{matched_var_name}=%{tx.0}'"

            #
            # -=[ Restricted File Access ]=-
            #
            # Detects attempts to retrieve application source code, metadata,
            # credentials and version control history possibly reachable in a web root.
            #
            SecRule REQUEST_FILENAME "@pmf restricted-files.data" \
                "id:930130,\
                phase:2,\
                block,\
                capture,\
                t:none,t:utf8toUnicode,t:urlDecodeUni,t:normalizePathWin,t:lowercase,\
                logdata:'Matched Data: %{TX.0} found within %{MATCHED_VAR_NAME}: %{MATCHED_VAR}',\
                msg:'Restricted File Access Attempt',\
                tag:'application-multi',\
                tag:'language-multi',\
                tag:'platform-multi',\
                tag:'attack-lfi',\
                tag:'OWASP_CRS/WEB_ATTACK/FILE_INJECTION',\
                tag:'WASCTC/WASC-33',\
                tag:'OWASP_TOP_10/A4',\
                tag:'PCI/6.5.4',\
                ver:'OWASP_CRS/3.1.0',\
                severity:'CRITICAL',\
                setvar:'tx.msg=%{rule.msg}',\
                setvar:'tx.lfi_score=+%{tx.critical_anomaly_score}',\
                setvar:'tx.anomaly_score_pl1=+%{tx.critical_anomaly_score}',\
                setvar:'tx.%{rule.id}-OWASP_CRS/WEB_ATTACK/FILE_INJECTION-%{matched_var_name}=%{tx.0}'
            </textarea>
        </div>

        <div id="detailDiv" class="detaildecision" 
            :style ="detaildecision" 
            >
            <div>
                <el-table
                    :data="manualrules"
                    style="width: 100%;background-color:transparent !important;margin-left: 120px;
    margin-top: 15px;"
                    >
                    <el-table-column
                        prop="name"
                        label="描述"
                        align="center"
                        width="160">
                    </el-table-column>
                    <el-table-column
                        prop="file"
                        label="规则"
                        align="center"
                        width="160">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        width="100">
                        <template slot-scope="scope">
                            <el-switch
                                    size="mini"
                                    v-model="enableRule[scope.$index]"
                                    active-text="启用">
                            </el-switch>
                        </template>
                    </el-table-column>
                 </el-table>

                 <el-table
                    :data="appfirewallMongoLogger"
                    style="width: 100%;background-color:transparent !important;margin-left: 20px;
    margin-top: 60px;"
                     @cell-mouse-enter="table_hover"
                    >
                    <el-table-column
                        prop="timestamp"
                        label="时间"
                        align="center"
                        width="140">
                    </el-table-column>
                    <el-table-column
                        prop="event_info.dst_info"
                        label="目标"
                        align="center"
                        width="160">
                    </el-table-column>
                    <el-table-column
                        prop="filesName"
                        label="触发规则"
                        align="center"
                        width="200">
                    </el-table-column>
                 </el-table>
            </div>

        </div>
       
        <div class="ribbonimage" :style ="ribbonimage" style="text-align:left;width:800px">
            <div style="position:relative;top:20px;left:40px;font-size:20px;font-weight:bold">决策管理</div>
            <span style="position:relative;top:35px;left:65px;display:block;padding-right:80px;">决策管理是无人安全脑进行全局系统配置的核心单元，负责接收环境安全信息和可用资源，并对应执行的下一步操作进行判断和跟踪。 
            <br/>
            <span style="font-size:80%;color:#999;">
            Decision management is the core functional unit to overall configurate the intelligent security brain, which is in charge of aggregating all security info and resources and make future movement judgement accordingly.</span></span>
        </div>

        <div class="containerEntity" :style ="entitybackground">
        </div>

        <div class="infodecision" :style ="infodecision" style="position:relative;margin:0px 20px;text-align:center;margin-top:20px;">
             <div style="position:absolute;left:287px;top:76px">{{decisionDetail.time}}</div>
             <div style="position:absolute;left:287px;top:116px">{{decisionDetail.src}}</div>
             <div style="position:absolute;left:287px;top:156px">{{decisionDetail.dest}}</div>
             <div style="position:absolute;left:610px;top:76px">{{decisionDetail.rule}}</div>
             <div style="position:absolute;left:610px;top:116px">{{decisionDetail.result}}</div>
             <div style="position:absolute;left:610px;top:156px">{{decisionDetail.urgent}}</div>
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
            detaildecision: {
                backgroundImage: "url("+require("./assets/images/detail-decision.png") + ")",
                position:"absolute",
                top:"310px",
                right:"337px",
                width:"580px",
                height:"513px",
                paddingLeft:"2px",
                zIndex:"10"
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
                backgroundImage: "url("+require("./assets/images/entity-decision.png") + ")",
                left:"380px",
                top:"330px",
                width:"800px",
                height:"694px",
                backgroundRepeat:"no-repeat",
                backgroundPosition:"0px 45px"
            },
            infodecision: {
                backgroundImage: "url("+require("./assets/images/info-decision.png") + ")",
                width:"1150px",
                height:"238px",
                top: "740px",
                left: "20px"
            },
            manualrules:[
                {name:"本地文件包含攻击-LFI",
                file:"REQUEST-930-APPLICATION-ATTACK-LFI.conf"},
                {name:"远程文件包含攻击-RFI",
                file:"REQUEST-931-APPLICATION-ATTACK-RFI.conf"},
                {name:"远程Shell命令执行-RCE",
                file:"REQUEST-932-APPLICATION-ATTACK-RCE.conf"},
                {name:"PHP远程命令执行-PHP",
                file:"REQUEST-933-APPLICATION-ATTACK-PHP.conf"},
                {name:"跨站脚本攻击-XSS",
                file:"REQUEST-941-APPLICATION-ATTACK-XSS.conf"},
                {name:"SQL注入攻击",
                file:"REQUEST-942-APPLICATION-ATTACK-SQLI.conf"}
            ],
            enableRule:[true,false,true,false,true,true],
            appfirewallMongoLogger:[],
            decisionDetail: {
                time:'',
                src:'',
                dest:'',
                rule:'',
                result:'',
                urgent:''
            }
        }
     },
    methods:{
         table_hover:function(row, column, cell, event){
            this.decisionDetail.time=row.timestamp;
            this.decisionDetail.src=row.event_info.src_info;
            this.decisionDetail.dest=row.event_info.dst_info;
            this.decisionDetail.rule=row.filesName;
            this.decisionDetail.result=row.event_info.attack_category;
            this.decisionDetail.urgent=row.event_info.maturity;
         }
    },
    mounted() {
        var self=this;
        mockAll();
        
        this.$root.eventHub.$emit('command-log', {text: "Decision Management Interface", type: "info"});

        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios({
                method: 'post',
                url:getServiceIP()+"/logger/searchdecision",
                data:'{currentPage:1, pageSize:50}'
        }).then(function(response){
            self.appfirewallMongoLogger=response.data.appfirewallMongoLogger;
        });
        
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

.el-switch__core {
    height: 12px;
    border-radius: 12px;
}
.el-switch.is-checked .el-switch__core::after {
    margin-left: -11px;
}
.el-switch__core:after {
    top:0px;
    width: 11px;
    height: 11px;
}
</style>








