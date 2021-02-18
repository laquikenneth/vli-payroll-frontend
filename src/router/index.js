import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../App.vue'
import Signup from '../views/Authentication/Signup.vue'
import Register from '../views/Authentication/Register.vue'
import Signin from '../views/Authentication/Signin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
