import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import vueRouter from  'vue-router'
import VueResource from 'vue-resource'

//Pages
//import App from './App.vue'
import Landing from './Landing.vue'


Vue.use(ElementUI, {size:'small'})
Vue.use(vueRouter)
Vue.use(VueResource)

const router = new vueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/portal', component: resolve => require(['./portal.vue'], resolve) }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(Landing)
})

Date.prototype.toLocaleString = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份 
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //小时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};