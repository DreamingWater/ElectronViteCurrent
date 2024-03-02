// @ts-nocheck
import { createApp } from 'vue'
// import "./style.css"
import { createPinia } from 'pinia'
// 调试

import App from './App.vue'
//import './preload/node-api'
import router from '@/router/index'
import 'normalize.css' //reset.css
import './assets/css/common.css'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// .use(ElementPlus)

const store = createPinia()

createApp(App).use(router).use(store)
  .mount('#app')

