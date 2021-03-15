import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false

// axios.defaults.baseURL = 'http://localhost:8000/api'

// axios.defaults.baseURL = 'http://host.docker.internal:8000/api'

axios.defaults.baseURL = 'https://vli-payroll-api-bziyh.ondigitalocean.app/api'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('u_t')
  const systemToken = localStorage.getItem('s_t')

  // user token
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  }

  // system token
  if (systemToken) {
    config.headers = {
      Authorization: `Bearer ${systemToken}`,
      Accept: 'application/json'
    }
  }
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  if (error.response.status !== 422) {
    alert('Session Expired. Please sigin again.')
  }
  router.push({ name: 'Signin' })
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

// route guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // user
    if (to.meta.guard === 'User') {
      if (!store.getters.loggedIn) {
        next({ name: 'Signin' })
      } else {
        next()
      }
    }
    // system
    if (to.meta.guard === 'System') {
      if (!store.getters.systemLoggedIn) {
        next({ name: 'System-Signin' })
      } else {
        next()
      }
    }
  } else {
    next()
  }

  if (to.matched.some(record => record.meta.requiresVerifiedEmail)) {
    store.dispatch('hasVerifiedEmail', to.params.id)
      .then(() => {
        if (!store.getters.hasVerifiedEmail) next({ name: 'Registered-Success' })
        else next()
      })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
