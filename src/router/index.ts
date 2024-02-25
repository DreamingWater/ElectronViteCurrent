import { createRouter, createWebHashHistory } from 'vue-router'

// 导入首页组件
import PracticalTableView from "@/views/useless/JunkTest.vue";

const router= createRouter({
  routes: [
    { path: '/', component: () => import('@/views/serial.vue') },
    { path: '/amplifier', component: () => import('@/views/amplifierGroup/index.vue') },
    { path: '/amplifier1', component: () => import('@/views/amplifier1/index.vue') },
    { path: '/index', component: () => import('@/views/home/index.vue') },
    { path: '/serial', component: () => import('@/views/serial.vue') },
    { path: '/test', component: () => import('@/views/test/test.vue') },
    { path: '/temperature', component: () => import('@/views/temperatureGroup/index.vue') },
    {path: '/creater', component: () => import('@/views/creater/index.vue') }
  ],
  history:createWebHashHistory(),
  // 优化跳转 点击首页 直接回到首页顶部
  scrollBehavior:()=>{
    return {
      top:0
    }
  }
})
export default router