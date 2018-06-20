<template>
    <el-main>
        <div class="asideimage" :style ="asideimage">
            <div style="height:125px"></div>
            <img src="./assets/images/new-image.png" width=340 style="cursor:pointer"/>

             <image-item v-for="image in images" class="blockimage" 
                :style="blockimage" 
                :class="{activeimage: isActive}"
                :id="image.id" 
                :name="image.name" 
                :sha="image.sha" 
                :size="image.size" 
                :create="image.create"
                :key="image.id">
            </image-item>

            
        </div>

        <div class="detailimage" :style ="detailimage">
            <div style="margin:80px">这里是镜像的详细信息</div>
        </div>
        
        <div class="ribbonimage" :style ="ribbonimage">
             <span style="position:relative;top:30px">镜像管理也是一门艺术2。<br/>
            艺术和科学往往在山顶重逢。</span>
        </div>

        <canvas width="1252" height="750" id="myCanvas" style="position:absolute;top:300px;left:330px;z-index:0" @mouseover="setActive" @mouseout="unsetActive">
        </canvas>
        
    

 
    </el-main>
</template>

<script>

import Vue from 'vue';

/*
Vue.component('msg', {
  functional: true,
  render: (createElement, context) => {
    return createElement('div', context.props.message)
  },
  props: ['message']
})
*/

Vue.component('image-item', {
  data() {
    return {
        
    }
  },
  props: ['id','name','sha','size','create','isActive'],
  template: '<div><div class="d-id">ID:{{id}}</div><div class="d-table"><table><tr><td>名称:</td><td>{{name}}</td></tr><tr><td>SHA</td><td>{{sha}}</td></tr><tr><td>大小</td><td>{{size}}</td></tr><tr><td>创建时间</td><td>{{create}}</td></tr></table></div></div>',
})

export default {
    name: 'imagemgmt',
    data() {
        return {
            images:[
                {
                    id:'001',
                    name:'ABC',
                    sha:'c3d92-3',
                    size:'116.5 MB',
                    create:'2018-02-02'
                },
                {
                    id:'002',
                    name:'CBA',
                    sha:'c3d92-3',
                    size:'116.5 MB',
                    create:'2018-02-02'
                }
            ],
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
                top:"420px",
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
            },
            isActive:false
        }
     },
    methods:{
        setActive:function(){
                this.isActive=true;
                console.log("active!");
                
            },
        unsetActive:function(){
                this.isActive=false;
            } 
    },
    mounted() {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var imgbg = new Image();
        imgbg.src = require("./assets/images/entity-container.png");
        imgbg.onload = function(){
            ctx.drawImage(imgbg, -20, 280);             
        };
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
}
.blockimage .d-id   { left:38px; top:78px; }
.blockimage .d-table { left:120px; top:-5px; }
.blockimage .d-table table td{width:70px;}


</style>








