<template>
    
    <div :style="indexbg">
        <div style="position:absolute;width:1920px;top:10px;text-align:center" >
            <img src="./assets/landing/banner.png" width="500" style="padding:0px auto;"/>
        </div>

     

        <div style="position:absolute;width:600px;top:200px;left:1270px;z-index:1" >
            <img src="./assets/landing/stat.png" width=600/>
        </div>

        <div class="container" style="margin:68px 0px 0px -6px;padding:0px">
            <video id="v1" width="100%" autoplay loop>
                <source v-if="src" :src="src" :type="type">

            </video>  
        

        </div><!-- End .container -->    
        <div class="login" style="width:1920px;text-align:center">
                <div style="padding-top:10px;font-size:9px;color:#83CDCE;font-family:Tahoma;text-align:center">


                <span>User Name:</span><input type="text" style="margin-left:10px;background-color:#eee"/> 

                <span style="margin-left:40px;">Password:</span><input type="text" style="margin-left:10px;background-color:#eee"/> 
                <input type="button" value="Login" style="margin-left:20px" @click="login"/>

                </div>
        </div>


        <div style="position:absolute;width:1920px;top:950px;text-align:center" >
            <img src="./assets/landing/cstklc.png" width="80" style="padding:0px auto;"/>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    data() {
        return {
           indexbg:{
                backgroundImage: "url("+require("./assets/landing/indexbg.jpg") + ")"
           },
           src: require("./assets/landing/beam.mp4"),
           type:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
        }
     },
    methods:{
        login:function()
        {
           
        }
    }

}
</script>

<style>
#app{
    width:1920px;height:1080px;overflow:hidden;
}
body {margin:0px;}
</style>








