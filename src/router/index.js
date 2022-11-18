/*eslint-disable*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import store from '../store/index.js'
import dashboard from '../views/dashboard.vue'
import createMachine from '../views/createMachine.vue'
import selectMachine from '../views/selectMachine.vue'
import createUser from '../views/createUser.vue'
import createRole from '../views/createRole.vue'
import createShift from '../views/createShift.vue'
import dashboardMachine from '../views/dashboardMachine.vue'
import createCompany from '../views/createCompany.vue'
import createGroup from '../views/createGroup.vue'
import machineLogin from '../views/machineLogin.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'machineLogin',
    component: machineLogin
  },

  {//ok
    path: '/machineLogin',
    name: 'machineLogin',
    component: machineLogin
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: login
  // },
  {
    path: '/createCompany',
    name: 'createCompany',
    component: createCompany
  },
  {
    path: '/createGroup',
    name: 'createGroup',
    component: createGroup
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


router.beforeEach(
  (to, from, next) => {

          if( to.name == 'Login'&&store.state.setup.company.id!='') {
              next({
                  path: '/home'
                  // Redirect to original path if specified
              })
          } else {
              next()
          }
      } 
          
)

export default router
