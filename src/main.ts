// @ts-nocheck
import { createApp } from 'vue'
// import "./style.css"
import { createPinia } from 'pinia'
// 调试

import App from './App.vue'
//import './preload/node-api'
import router from '@/router/index'
import 'normalize.css' //reset.css
import './assets/css/dm_sans.css'
import './assets/css/common.css'

import { scheduler } from './api/schedulerPipeline';


// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// .use(ElementPlus)


const store = createPinia()

const app = createApp(App).use(router).use(store);

// 添加到 Vue 全局属性
// Provide the scheduler instance
app.provide('$scheduler', scheduler);

app.mount('#app');

// createApp(App).use(router).use(store)
//   .mount('#app')

