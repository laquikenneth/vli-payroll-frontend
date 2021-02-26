
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
import SystemDashboard from '../components/Dashboard/System'
import UserSignup from '../views/Authentication/User/Signup.vue'
import UserRegister from '../views/Authentication/User/Register.vue'
import UserSignin from '../views/Authentication/User/Signin.vue'
import SystemSignin from '../views/Authentication/System/Signin.vue'
import SystemClientList from '../views/System/Client/List.vue'
import SystemClient from '../views/System/Client/Components/Client.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  {
    path: '/auth/signin',
    name: 'Signin',
    component: UserSignin
  },
  {
    path: '/auth/signup',
    name: 'Signup',
    component: UserSignup
  },
  {
    path: '/auth/register/:id',
    name: 'Register',
    component: UserRegister
  },
  {
    path: '/auth/system/signin',
    name: 'System-Signin',
    component: SystemSignin
  },
  {
    path: '/system/register',
    name: 'System-Register'
  },
  {
    path: '/system/dashboard',
    name: 'System-Dashboard',
    component: SystemDashboard,
    children: [
      {
        path: 'client/list',
        name: 'System-Client-List',
        component: SystemClientList,
        meta: {
          guard: 'System',
          requiresAuth: true
        }
      },
      {
        path: 'client/:id',
        name: 'System-Client-Edit',
        component: SystemClient,
        meta: {
          guard: 'System',
          requiresAuth: true
        }
      }
    ],
    meta: {
      guard: 'System',
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
