import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// axios.defaults.baseURL = 'http://localhost:8000/api'

export default new Vuex.Store({
  state: {
    systemToken: localStorage.getItem('system_token') || null
  },
  getters: {
    systemLoggedIn (state) {
      return state.systemToken !== null
    }
  },
  mutations: {
    systemToken (state, payload) {
      state.systemToken = payload
    }
  },
  actions: {
    // system token
    async systemToken (context, credentials) {
      try {
        await new Promise((resolve, reject) => {
          axios.post('s/login', {
            email: credentials.email,
            password: credentials.password
          })
            .then(response => {
              console.log(response)
              this.systemToken = response.data.access_token
              localStorage.setItem('system_token', this.systemToken)
              context.commit('systemToken', this.systemToken)
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('system_token')
              reject(error)
            })
        })
      } catch (error) {
        localStorage.removeItem('system_token')
      }
    }
  },
  modules: {
  }
})
