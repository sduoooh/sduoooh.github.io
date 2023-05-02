import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'

import '@unocss/reset/tailwind.css'
import 'element-plus/dist/index.css'
import 'uno.css'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')