import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import Vue3Toastify  from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import "leaflet/dist/leaflet.css";

const app = createApp(App);

app.use(
    Vue3Toastify,
    {
      autoClose: 3000,
    },
)

app.mount('#app')

//createApp(App).mount('#app')
