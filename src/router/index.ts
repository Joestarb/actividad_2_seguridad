import { createRouter, createWebHistory } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'

import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/Login/LoginView.vue'
import RegisterView from '@/views/Register/RegisterView.vue'
import View404 from '@/views/View404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: HomeView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: View404,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userToken = useLocalStorage('userToken', null)
  if (!userToken.value && to.name !== 'Login' && to.name !== 'Register' && to.name !== '404') {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
