import { createApp } from 'vue'
import App from './App.vue'

// Router
import Route from './router'

// Element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// naive ui
import naive from 'naive-ui'

// createPinia
import { createPinia } from 'pinia'

// animate
import 'animate.css'

// moment
import moment from 'moment'
import 'moment/dist/locale/zh-cn'

// API
import { API } from './model'
import api from './api'
// qs
import qs from 'qs'
// passive
import 'default-passive-events'

const app = createApp(App)
app.use(Route)
app.use(ElementPlus, { locale: zhCn })
app.use(naive)
app.use(createPinia())
moment.locale('zh-cn')
app.provide<API.API>('$api', api)
app.config.globalProperties.$api = api
app.config.globalProperties.$qs = qs
// errorHandle
// app.config.errorHandler = (err, vm, info) => {
//   console.log('错误信息', err, info)
// }

// mount
app.mount('#app')
