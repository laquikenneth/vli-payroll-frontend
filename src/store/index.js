import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: localStorage.getItem('u_t') || null,
    cacheToken: null,
    systemToken: localStorage.getItem('s_t') || null,
    cacheSystemToken: null
  },
  getters: {
    authenticatedUser (state) {
      return state.user
    },
    systemLoggedIn (state) {
      return state.systemToken !== null
    }
  },
  mutations: {
    authenticatedUser (state, payload) {
      state.user = payload
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
          // user
          default:
            axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('u_t')
            if (context.getters.systemLoggedIn) {
              await new Promise((resolve, reject) => {
                axios.get('u/user')
                  .then(response => {
                    localStorage.removeItem('u_t')
                    context.commit('logout')
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
    }
  },
  modules: {
  }
})
