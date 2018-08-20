<!-- portal.vue -->

<template>
    <div :style="indexbg" id="bgDiv">
        <div id="portalDiv" :style="portaldiv">
            <div class="login" style="position:absolute;top:200px;width:1920px;text-align:center;z-index:1">
                <div style="padding-top:10px;font-size:9px;color:#83CDCE;font-family:Tahoma;text-align:center;">

                <span class="func"><img id="f1" src="./assets/landing/f1.png"/></span>
                <span class="func"><img id="f2" src="./assets/landing/f2.png"/></span>
                <span class="func"><img id="f3" src="./assets/landing/f3.png"/></span>
                <span class="func"><img id="f4" src="./assets/landing/f4.png"/></span>
                <span class="func"><img id="f5" src="./assets/landing/f5.png"/></span>

                </div>
            </div>

            <div style="position:absolute;width:1920px;top:970px;text-align:center;z-index:1" >
                <img src="./assets/landing/portal_tail.jpg" style="padding:0px auto;"/>
            </div>

            <div class="container" style="position:absolute;top:52px;padding:0px;width:1920px;height:960px;z-index:0;" :style="bgstar">
                
            </div> 

            <div style="position:absolute;width:1920px;top:10px;text-align:center" >
                <img src="./assets/landing/banner2.png" width="800" style="padding:0px auto;"/>
            </div>

            
            <div style="position:absolute;width:1920px;top:700px;text-align:center" >
                <img src="./assets/landing/brain.png" width="800" style="padding:0px auto;"/>
            </div>

            <div id="divDialog" style="display:none;position:absolute;width:1800px;height:300px;top:780px;text-align:center; z-index:1" :style="dialog">
                <div id="txtName" style="font-size:24px;padding-top:35px;font-weight:bold;font-family:'微软雅黑';color:#83CDCE">{{txtName}}</div>
                <hr style="width:70%" color=#222 size=1/>
                <div id="txtDesc" style="font-size:18px;padding-top:5px;font-family:'微软雅黑';color:#83CDCE">{{txtDesc}}</div>

            </div>

        </div>
    </div>
     
</template>



<script>
import $ from 'jquery'
export default {
     data() {
        return {
           bgstar:{
                backgroundImage: "url("+require("./assets/landing/bg_star.jpg") + ")",
                backgroundRepeat:"no-repeat"
           },
           dialog:{
                backgroundImage: "url("+require("./assets/landing/dialog.png") + ")",
                backgroundRepeat:"no-repeat"
           },
           portaldiv:{
                backgroundImage: "url("+require("./assets/landing/portal.jpg") + ")",
                backgroundRepeat:"no-repeat"
           },
           indexbg:{
                backgroundImage: "url("+require("./assets/landing/indexbg.jpg") + ")"
           },
           txtName:'',
           txtDesc:''
        }
     },
    methods:{
        login:function()
        {
            this.$router.push('/Portal');
        }
    },
    mounted(){
        var self=this;
        $("span.func img").mouseover(function () {

        	$("#divDialog").show();

        	var sr=$(this).attr("id");
        	switch(sr)
        	{
        		case "f1":
        			self.txtName="本体脑 Ontological Brain";
        			self.txtDesc="本体脑是安全智慧脑的概念引擎，将网络空间的各类实体、关系、状态、事件等表示为统一形式化、无歧义的知识图谱，并通过高可视化的方式呈现。";
        			break;
        		case "f2":
        			self.txtName="博识脑 Omniscient  Brain";
        			self.txtDesc="博识脑以本体脑为驱动，基于网络空间安全领域内涵及特点，对非结构化知识进行高效的表示、组织、存储，简化访问和推理过程，欢呼像使用数据库一般地使用知识库。";
        			break;
        		case "f3":
        			self.txtName="防御脑 Defense Brain";
        			self.txtDesc="防御脑是人工智能应用于网络空间防御多元目标的深刻实践，通过生能、聚能、赋能、释能机制，实现安全能力的精准投送和攻击面的全局管理。";
        			break;
        		case "f4":
        			self.txtName="决策脑 Decisive Brain";
        			self.txtDesc="决策脑面向网络空间在不断自我演化中日益精细复杂的结构与功能，基于知识事实、知识结构和任务目标进行推理判断和问题求解，挖掘深层次知识、检测异常、预测风险。";
        			break;
        		case "f5":
        			self.txtName="反制脑 Deterence Brain";
        			self.txtDesc="反制脑是内省人工智能自身存在的安全问题，对其进行剖析和研究的自学习系统，最终实现安全智慧脑的高可靠、高可用。";
        			break;
        	}
        });

        $("span.func img").click(function () {

        	var sr=$(this).attr("id");
        	switch(sr)
        	{
                case "f3":
                    self.$router.push('/Dashboard');
                    break;
        	}


        });

    }
}
</script>

<style>
#bgDiv{
    width:1920px;height:1080px;overflow:hidden;
}
body {margin:0px;overflow:hidden;}
span.func
{
    text-align:center;
    margin-right:50px;
}

span.func img
{
    width:300px;
    cursor:pointer;
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    border-bottom:5px solid transparent;
}
span.func img:hover
{
    width:300px;
    cursor:pointer;
    -webkit-filter: grayscale(0%);
    -moz-filter: grayscale(0%);
    -ms-filter: grayscale(0%);
    -o-filter: grayscale(0%);
    filter: grayscale(0%);
    border-bottom:5px solid #83CDCE;
}
</style>