import { createRouter, createWebHistory } from 'vue-router'
import UserView from '../views/user/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layout/dashboard.vue'),
      children: [
        {
          path: '',
          component: UserView,
        },
      ],
    },
  ],
})

export default router
