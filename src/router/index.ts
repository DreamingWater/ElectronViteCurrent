import { createRouter, createWebHashHistory } from 'vue-router'

// 导入首页组件
import PracticalTableView from "@/views/useless/JunkTest.vue";

const router= createRouter({
  routes: [
    { path: '/', component: () => import('@/components/section/MainContent.vue') },
    { path: '/serial', component: () => import('@/views/serial.vue') }
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