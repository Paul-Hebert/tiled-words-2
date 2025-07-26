import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import LevelView from './views/LevelView.vue'
import Instructions from './views/Instructions.vue'
import LevelList from './views/LevelList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/instructions',
      name: 'instructions',
      component: Instructions,
    },
    {
      path: '/level/:id',
      name: 'level',
      component: LevelView,
      props: true,
    },
    {
      path: '/levels',
      name: 'levels',
      component: LevelList,
    },
  ],
})

export default router
