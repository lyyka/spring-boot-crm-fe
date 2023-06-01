import './assets/app.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import TableBodyVue from './components/ui/TableBody.vue'

const app = createApp(App)

app.component("TableBody", TableBodyVue);

app.use(createPinia())
app.use(router)

app.mount('#app')
