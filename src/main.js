import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import Vue3Toastify  from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import "leaflet/dist/leaflet.css";
import router from './router.js'


const app = createApp(App);
app.use(router)
app.use(
    Vue3Toastify,
    {
      autoClose: 3000,
    },
)
app.mount('#app')