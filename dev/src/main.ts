import { createApp } from 'vue'
import 'driver.js/dist/driver.css'
import './main.css'

// Using import aliases in Vite
import { VueDriver } from '../../src'

// @ts-expect-error: TODO: fix this
import App from './App.vue'

const app = createApp(App)
app.use(VueDriver)

app.mount('#app')
