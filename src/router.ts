import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import LevelView from './views/LevelView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/level/:id',
      name: 'level',
      component: LevelView,
      props: true,
    },
  ],
})

export default router
