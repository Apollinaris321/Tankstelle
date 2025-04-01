import { createRouter } from 'vue-router'

import HomeView from './App.vue'
import { createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: HomeView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
