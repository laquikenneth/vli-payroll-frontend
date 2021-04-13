import store from '../store'
import router from '../router'

function routerConfig () {
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
}

export { routerConfig }
