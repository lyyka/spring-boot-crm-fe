import Auth from '@/api/auth/auth'
import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'

// allow routes to be accessed only when logged in
const authMiddleware = (to: RouteLocationNormalized) => {
  return Auth.isAuthenticated();
};

// prevent routes from being accessed if logged in
const guestMiddleware = (to: RouteLocationNormalized) => {
  if (Auth.isAuthenticated()) {
    return { name: 'home' };
  }

  return true;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/auth/login',
      name: 'auth.login',
      beforeEnter: guestMiddleware,
      component: () => import('../views/Login.vue')
    },
    {
      path: '/crm/dashboard',
      name: 'crm.dashboard',
      beforeEnter: authMiddleware,
      component: () => import('../views/Dashboard.vue')
    }
  ]
})

export default router
