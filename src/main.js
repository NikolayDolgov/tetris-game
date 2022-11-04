import { createApp } from 'vue'
import store from './store/store'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// Install the store instance as a plugin
app.use(store)
app.mount('#app')