
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
import EmailVerified from '../components/Common/Email-Verified'
import RegisteredSuccess from '../components/Common/Registered-Success.vue'
import SystemDashboard from '../components/Dashboard/System'
import UserSignup from '../views/Authentication/User/Signup.vue'
import UserRegister from '../views/Authentication/User/Register.vue'
import UserSignin from '../views/Authentication/User/Signin.vue'
import SystemSignin from '../views/Authentication/System/Signin.vue'
import SystemClientList from '../views/System/Client/List.vue'
import SystemClient from '../views/System/Client/Components/Client.vue'
import SystemClientApprovedList from '../views/System/Client/Approved.vue'
import SystemClientApproved from '../views/System/Client/Components/Approved.vue'

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
    component: UserRegister,
    meta: {
      requiresVerifiedEmail: true
    }
  },
  {
    path: '/verified',
    name: 'Email-Verified',
    component: EmailVerified
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
    path: '/registered',
    name: 'Registered-Success',
    component: RegisteredSuccess
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
      },
      {
        path: 'client/approved',
        name: 'System-Client-Approved',
        component: SystemClientApprovedList,
        meta: {
          guard: 'System',
          requiresAuth: true
        }
      },
      {
        path: 'client/approved/:id',
        name: 'System-Client-Approved-Edit',
        component: SystemClientApproved,
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
