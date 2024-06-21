import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: MainView,
      children:[
        {
          path: '/',
          name: 'Home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: '/employ',
          name: 'Employ',
          component: () => import('../views/EmployView.vue')
        },
        {
          path: '/employList',
          name: 'EmployList',
          component: () => import('../views/EmployListView.vue')
        },
        {
          path: '/service',
          name: 'Service',
          component: () => import('../views/ServiceView.vue')
        },
        {
          path: '/personnel',
          name: 'Personnel',
          component: () => import('../views/PersonnelView.vue')
        },
        {
          path: '/company',
          name: 'Company',
          component: () => import('../views/CompanyView.vue')
        },
        {
          path: '/user',
          name: 'User',
          component: () => import('../views/UserView.vue')
        },
        {
          path: '/role',
          name: 'Role',
          component: () => import('../views/RoleView.vue')
        },
        {
          path: '/orderList',
          name: 'OrderList',
          component: () => import('../views/OrderListView.vue')
        },
        {
          path: '/orderListAdmin',
          name: 'OrderListAdmin',
          component: () => import('../views/OrderListAdminView.vue')
        },
        {
          path: '/service/:id',
          name: 'ServiceDetail',
          component: () => import('../views/ServiceDetailView.vue')
        },
        {
          path: '/personnel/:id',
          name: 'PersonnelDetail',
          component: () => import('../views/PersonnelDetailView.vue')
        },
        {
          path: '/confirmOrder/:id',
          name: 'ConfirmOrder',
          component: () => import('../views/ConfirmOrderView.vue')
        },
        {
          path: '/order/:id',
          name: 'Order',
          component: () => import('../views/OrderView.vue')
        },
        {
          path: '/personal',
          name: 'Personal',
          component: () => import('../views/PersonalView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/reg',
      name: 'Register',
      component: () => import('../views/RegView.vue')
    }

  ]
})

export default router
