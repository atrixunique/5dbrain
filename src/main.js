import Vue from 'vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'

import 'element-ui/lib/theme-chalk/index.css'

//Pages

import BrainApp from './BrainApp.vue'
import vueRouter from 'vue-router'
import Entrance from './Entrance.vue'
import Portal from './Portal.vue'
import BrainDefense from './BrainDefense.vue'
import VDashboard from './VDashboard.vue'
import VContainer from './VContainer.vue'
import VImage from './VImage.vue'
import VInfo from './VInfo.vue'
import VDecision from './VDecision.vue'
import VKnowledge from './VKnowledge.vue'
import VSystem from './VSystem.vue'

Vue.use(vueRouter)
Vue.use(ElementUI, { size: 'small' })
Vue.use(VueResource)

const router = new vueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { 
      path: '/', 
      component: Entrance, 
      meta: { mid: 0 } },
    { 
      path: '/Portal', 
      component: Portal, 
      meta: { mid: 1 } 
    },
    { 
      path: '/Defense', 
      component: BrainDefense, 
      meta: { mid: 2 },
      children: [  //这里就是二级路由的配置
        { path: '/Dashboard',component: VDashboard},
        { path: '/Container',component: VContainer},
        { path: '/Image',component: VImage},
        { path: '/Info',component: VInfo},
        { path: '/Decision',component: VDecision},
        { path: '/Knowledge',component: VKnowledge},
        { path: '/System',component: VSystem},
       ]
    },
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
  render: h => h(BrainApp),
  data: {
    eventHub: new Vue()
  }
})

Date.prototype.toLocaleCNString = function (fmt) {
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