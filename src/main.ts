import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import request from './utils/request'

import App from './App.vue'
import './assets/main.scss'
export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())
  app.provide('UseRequestConfigContext', {
    manual: true,
    // loadingDelay: 200,
    requestMethod: (param: any) => request(param),
  })
  return {
    app,
  }
}
