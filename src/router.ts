import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import LevelView from './views/LevelView.vue'
import Instructions from './views/Instructions.vue'
import LevelList from './views/LevelList.vue'
import GameCompleted from './views/GameCompleted.vue'

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
    {
      path: '/game-completed',
      name: 'game-completed',
      component: GameCompleted,
    },
  ],
  scrollBehavior() {
    // Always scroll to top when navigating
    return { top: 0 }
  },
})

export default router
