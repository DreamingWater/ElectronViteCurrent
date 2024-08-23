import { createRouter, createWebHashHistory } from 'vue-router'


const router= createRouter({
  routes: [
    { path: '/', component:() => import('@/views/test/test.vue')},
    // { path: '/', component:() => import('@/views/seedPurchased/index.vue') },
    { path: '/creater', component: () => import('@/views/seedPurchased/index.vue') },
    { path: '/amplifier', component: () => import('@/views/amplifierGroup/index.vue') },
    { path: '/index', component: () => import('@/views/home/index.vue') },
    { path: '/test', component: () => import('@/views/test/test.vue') },
    { path: '/temperature', component: () => import('@/views/temperatureGroup/index.vue') },
    { path: '/serial', component: () => import('@/views/serialControl/test.vue') },
    { path: '/about', component: () => import('@/views/sections/about/about.vue') },
    { path: '/manager', component: () => import('@/views/Manager/index.vue') },
    { path: '/watercooling', component: () => import('@/views/waterCooling/index.vue') }
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