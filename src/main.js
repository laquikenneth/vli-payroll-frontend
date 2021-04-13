import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { axiosBaseUrl, axiosInterceptorRequest, axiosInterceptorResponse } from './config/axios'
import { routerConfig } from './config/router'

Vue.config.productionTip = false

axiosBaseUrl()

axiosInterceptorRequest()

axiosInterceptorResponse()

routerConfig()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
