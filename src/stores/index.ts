import { createPinia } from "pinia"
import persist from 'pinia-plugin-persistedstate'

// 创建 pinia 实例
const store = createPinia()
// 使用持久化插件
store.use(persist)

// 默认导出，给 main.ts 使用
export default store

// 模块统一导出
export * from './modules/config'
export * from './modules/member'