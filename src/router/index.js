import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import dashboard from '../views/dashboard.vue'
import createMachine from '../views/createMachine.vue'
import selectMachine from '../views/selectMachine.vue'
import createUser from '../views/createUser.vue'
import createRole from '../views/createRole.vue'
import createShift from '../views/createShift.vue'
import dashboardMachine from '../views/dashboardMachine.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/dashboardMachine',
    name: 'dashboardMachine',
    component: dashboardMachine
  },
  {
    path: '/createMachine',
    name: 'createMachine',
    component: createMachine
  },
  {
    path: '/selectMachine',
    name: 'selectMachine',
    component: selectMachine
  },
  {
    path: '/createUser',
    name: 'createUser',
    component: createUser
  },

  {
    path: '/createRole',
    name: 'createRole',
    component: createRole
  },
  {
    path: '/createShift',
    name: 'createShift',
    component: createShift
  },

  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
