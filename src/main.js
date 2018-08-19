import Vue from 'vue'
import ElementUI from 'element-ui'
import vueRouter from  'vue-router'
import VueResource from 'vue-resource'

import 'element-ui/lib/theme-chalk/index.css'

//Pages

import Landing from './Landing.vue'
import Entrance from './Entrance.vue'

Vue.use(ElementUI, { size: 'small' })
Vue.use(vueRouter)
Vue.use(VueResource)

const router = new vueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: resolve => require(['./VDashboard.vue'], resolve), meta: { mid: 0 } },
    { path: '/Dashboard', component: resolve => require(['./VDashboard.vue'], resolve), meta: { mid: 1 } },
    { path: '/Container', component: resolve => require(['./VContainer.vue'], resolve), meta: { mid: 2 } },
    { path: '/Image', component: resolve => require(['./VImage.vue'], resolve), meta: { mid: 3 } },
    { path: '/Info', component: resolve => require(['./VInfo.vue'], resolve), meta: { mid: 4 } },
    { path: '/Decision', component: resolve => require(['./VDecision.vue'], resolve), meta: { mid: 5 } },
    { path: '/System', component: resolve => require(['./VSystem.vue'], resolve), meta: { mid: 6 } }
  ]
})

Vue.component('msg', {
  functional: true,
  render: (createElement, context) => {
    return createElement('div', context.props.message)
  },
  props: ['message']
})

new Vue({
  el: '#app',
  router,
  render: h => h(Landing),
  data: {
    eventHub: new Vue()
  }
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