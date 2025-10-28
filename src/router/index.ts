import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/LandingView.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: () => import('@/views/TicketsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/tickets/new',
      name: 'ticket-new',
      component: () => import('@/views/TicketFormView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/tickets/:id/edit',
      name: 'ticket-edit',
      component: () => import('@/views/TicketFormView.vue'),
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  // Check authentication using localStorage directly
  const session = localStorage.getItem('ticketapp_session')
  let isAuthenticated = false
  
  if (session) {
    try {
      const sessionData = JSON.parse(session)
      isAuthenticated = sessionData.expires > Date.now()
    } catch {
      isAuthenticated = false
    }
  }
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router