import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    email: '',
    token: localStorage.getItem('u_t') || null,
    cacheToken: null,
    systemToken: localStorage.getItem('s_t') || null,
    cacheSystemToken: null,
    emailVerified: false
  },
  getters: {
    authenticatedUser (state) {
      return state.user
    },
    loggedIn (state) {
      return state.token !== null
    },
    systemLoggedIn (state) {
      return state.systemToken !== null
    },
    hasVerifiedEmail (state) {
      return state.emailVerified
    },
    email (state) {
      return state.email
    }
  },
  mutations: {
    authenticatedUser (state, payload) {
      state.user = payload
    },
    login (state, payload) {
      state.token = payload
      // state.cacheSystemToken = payload
    },
    systemLogout (state) {
      state.systemToken = null
    },
    systemLogin (state, payload) {
      state.systemToken = payload
      state.cacheSystemToken = payload
    },
    is_system_token_null (state) {
      state.systemToken = localStorage.getItem('s_t')
    },
    is_system_token_change (state) {
      if (state.cacheSystemToken !== state.systemToken) {
        state.systemToken = null
      }
    },
    hasVerifiedEmail (state, payload) {
      state.emailVerified = payload
    },
    email (state, payload) {
      state.email = payload
    }
  },
  actions: {
    async authenticatedUser (context, guard) {
      try {
        switch (guard) {
          case 'System':
            axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('s_t')
            if (context.getters.systemLoggedIn) {
              await new Promise((resolve, reject) => {
                axios.get('s/user')
                  .then(response => {
                    context.commit('authenticatedUser', response.data)
                    resolve(response)
                  })
                  .catch(error => {
                    reject(error)
                  })
              })
            }
            break
          case 'User':
            axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('u_t')
            if (context.getters.loggedIn) {
              await new Promise((resolve, reject) => {
                axios.get('u/user')
                  .then(response => {
                    context.commit('authenticatedUser', response.data)
                    // localStorage.removeItem('u_t')
                    // context.commit('logout')
                    resolve(response)
                  })
                  .catch(error => {
                    reject(error)
                  })
              })
            }
            break
          // user
          default:
            axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('u_t')
            if (context.getters.loggedIn) {
              await new Promise((resolve, reject) => {
                axios.get('u/user')
                  .then(response => {
                    context.commit('authenticatedUser', response.data)
                    // localStorage.removeItem('u_t')
                    // context.commit('logout')
                    resolve(response)
                  })
                  .catch(error => {
                    reject(error)
                  })
              })
            }
            break
        }
      } catch (error) {
      }
    },
    // user token
    async login (context, payload) {
      try {
        await new Promise((resolve, reject) => {
          axios.post('u/login', {
            email: payload.email,
            password: payload.password
          })
            .then(response => {
              localStorage.setItem('u_t', response.data.access_token)
              context.commit('login', response.data.access_token)
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('u_t')
              reject(error)
            })
        })
      } catch (error) {
        localStorage.removeItem('u_t')
      }
    },
    async systemLogout (context) {
      try {
        axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('s_t')
        if (context.getters.systemLoggedIn) {
          await new Promise((resolve, reject) => {
            axios.post('s/logout')
              .then(response => {
                localStorage.removeItem('s_t')
                context.commit('systemLogout')
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    // system token
    async systemLogin (context, payload) {
      try {
        await new Promise((resolve, reject) => {
          axios.post('s/login', {
            email: payload.email,
            password: payload.password
          })
            .then(response => {
              localStorage.setItem('s_t', response.data.access_token)
              context.commit('systemLogin', response.data.access_token)
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('s_t')
              reject(error)
            })
        })
      } catch (error) {
        localStorage.removeItem('s_t')
      }
    },
    async hasVerifiedEmail (context, id) {
      try {
        await new Promise((resolve, reject) => {
          axios.get('auth/client/email', {
            params: {
              cntrl_no: id
            }
          })
            .then(response => {
              const emailVerified = response.data.email
              if (typeof (emailVerified) !== 'undefined') {
                context.commit('hasVerifiedEmail', true)
                context.commit('email', response.data.email)
              } else {
                context.commit('hasVerifiedEmail', false)
              }
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      } catch (error) {
      }
    }
  },
  modules: {
  }
})
