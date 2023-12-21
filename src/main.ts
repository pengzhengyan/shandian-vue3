import { createApp } from 'vue'
import './style.less'
import App from '@/App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import svgIcon from "@/components/SvgIcon.vue";  // 导入svg icon 组件
import 'virtual:svg-icons-register' // 导入svg icon 插件
import store from './stores'  // 导入 pinia 实例


const app = createApp(App)

app
  .use(router)
  .use(ElementPlus)
  .use(store)
  .component('svg-icon', svgIcon)
  .mount('#app')
