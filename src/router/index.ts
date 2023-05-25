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
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/auth/login',
      name: 'auth.login',
      beforeEnter: guestMiddleware,
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/crm/dashboard',
      name: 'crm.dashboard',
      beforeEnter: authMiddleware,
      component: () => import('@/views/Dashboard.vue')
    },
    {
      path: '/crm/users',
      name: 'crm.users.index',
      beforeEnter: authMiddleware,
      component: () => import('@/views/UsersIndex.vue')
    },
    {
      path: '/crm/users/create',
      name: 'crm.users.create',
      beforeEnter: authMiddleware,
      component: () => import('@/views/UsersCreate.vue')
    },
    {
      path: '/crm/users/:id',
      name: 'crm.users.show',
      beforeEnter: authMiddleware,
      component: () => import('@/views/UsersShow.vue')
    },
    {
      path: '/crm/pipelines',
      name: 'crm.pipelines.index',
      beforeEnter: authMiddleware,
      component: () => import('@/views/PipelinesIndex.vue')
    },
    {
      path: '/crm/pipelines/create',
      name: 'crm.pipelines.create',
      beforeEnter: authMiddleware,
      component: () => import('@/views/PipelinesCreate.vue')
    },
    {
      path: '/crm/pipelines/:id',
      name: 'crm.pipelines.show',
      beforeEnter: authMiddleware,
      component: () => import('@/views/PipelinesShow.vue')
    },
    {
      path: '/crm/stages/:id',
      name: 'crm.stages.show',
      beforeEnter: authMiddleware,
      component: () => import('@/views/StagesShow.vue')
    },
    {
      path: '/crm/clients',
      name: 'crm.clients.index',
      beforeEnter: authMiddleware,
      component: () => import('@/views/ClientsIndex.vue')
    },
    {
      path: '/crm/clients/create',
      name: 'crm.clients.create',
      beforeEnter: authMiddleware,
      component: () => import('@/views/ClientsCreate.vue')
    },
    {
      path: '/crm/clients/:id',
      name: 'crm.clients.show',
      beforeEnter: authMiddleware,
      component: () => import('@/views/ClientsShow.vue')
    }
  ]
})

export default router
