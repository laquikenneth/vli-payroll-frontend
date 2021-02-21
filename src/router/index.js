import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
import Signup from '../views/Authentication/Signup.vue'
import Register from '../views/Authentication/Register.vue'
import Signin from '../views/Authentication/Signin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  {
    path: '/auth/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/auth/register/:email',
    name: 'Register',
    component: Register
  },
  {
    path: '/auth/signin',
    name: 'Signin',
    component: Signin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
