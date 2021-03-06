import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    email: '',
    is_admin: '',
    token: localStorage.getItem('u_t') || '',
    systemToken: localStorage.getItem('s_t') || null,
    cacheToken: null,
    cacheSystemToken: null,
    emailVerified: false,
    auth_message: null
  },
  getters: {
    AUTHENTICATED_TYPE (state) {
      return state.is_admin
    },
    AUTHENTICATED_USER (state) {
      return state.user
    },
    AUTH_MESSAGE (state) {
      return state.auth_message
    },
    loggedIn: state => !!state.token,
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
    SET_AUTHENTICATED_TYPE (state, payload) {
      state.is_admin = payload
    },
    SET_AUTHENTICATED_USER (state, payload) {
      state.user = payload
    },
    logout (state) {
      state.token = null
    },
    SET_AUTH_MESSAGE (state, payload) {
      state.auth_message = payload
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
    async AUTH_TYPE (context) {
      try {
        if (context.getters.loggedIn) {
          return new Promise((resolve, reject) => {
            axios.get('u/type')
              .then(response => {
                context.commit('SET_AUTHENTICATED_TYPE', response.data)
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
    async AUTH_USER (context, guard) {
      // user
      try {
        if (guard === 'User' && context.getters.loggedIn) {
          return new Promise((resolve, reject) => {
            axios.get('u/user')
              .then(response => {
                context.commit('SET_AUTHENTICATED_USER', response.data)
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
      // system
      if (guard === 'System') {
        if (context.getters.systemLoggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('s/user')
              .then(response => {
                context.commit('SET_AUTHENTICATED_USER', response.data)
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      }
    },
    async AUTH_USER_LOGOUT (context) {
      try {
        if (context.getters.loggedIn) {
          return new Promise((resolve, reject) => {
            axios.post('u/logout')
              .then(response => {
                localStorage.removeItem('u_t')
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
    // user token
    async AUTHENTICATE (context, payload) {
      context.commit('SET_AUTH_MESSAGE', null)
      try {
        await new Promise((resolve, reject) => {
          axios.post('u/login', {
            email: payload.email,
            password: payload.password
          })
            .then(response => {
              localStorage.setItem('u_t', response.data.access_token)
              context.commit('login', response.data.access_token)
              // context.dispatch('authenticatedUser', 'User')
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('u_t')
              context.commit('SET_AUTH_MESSAGE', error.response.data.message)
              reject(error)
            })
        })
      } catch (error) {
        localStorage.removeItem('u_t')
      }
    },
    async systemLogout (context) {
      try {
        if (context.getters.systemLoggedIn) {
          await new Promise((resolve, reject) => {
            axios.post('s/logout')
              .then(response => {
                localStorage.removeItem('s_t')
                this.state.user = {}
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
      context.commit('SET_AUTH_MESSAGE', null)
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
              context.commit('SET_AUTH_MESSAGE', error.response.data.message)
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
