import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8000/api'

// axios.defaults.baseURL = 'http://host.docker.internal:8000/api'

// axios.defaults.baseURL = 'https://vli-payroll-api-bziyh.ondigitalocean.app/api'

// route guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // user
    if (to.meta.guard === 'User') {
      if (!store.getters.loggedIn) {
        next({ name: 'Signin' })
      } else {
        store.dispatch('authenticatedUser', 'User')
        next()
      }
    }
    // system
    if (to.meta.guard === 'System') {
      if (!store.getters.systemLoggedIn) {
        next({ name: 'System-Signin' })
      } else {
        store.dispatch('authenticatedUser', 'System')
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
