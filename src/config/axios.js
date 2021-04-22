import router from '../router'
import axios from 'axios'

function axiosBaseUrl () {
  // axios.defaults.baseURL = 'http://localhost:8000/api'

  // axios.defaults.baseURL = 'http://host.docker.internal:8000/api'

  // axios.defaults.baseURL = 'http://192.168.1.7:8000/api'

  axios.defaults.baseURL = 'https://payroll-api-xb7i8.ondigitalocean.app/api'
}

function axiosConfigHeader (config, token) {
  config.headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  }
}

function axiosInterceptorRequest () {
  axios.interceptors.request.use(function (config) {
    // call axiosConfigHeader function
    axiosConfigHeader(config, localStorage.getItem('u_t') || localStorage.getItem('s_t'))

    // Do something before request is sent
    return config
  }, function (error) {
    // Do something with request error
    alert('Unauthorized Request.')
    location.reload()
    return Promise.reject(error)
  })
}

function axiosInterceptorResponse () {
  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
    // return response
  }, function (error) {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          // do something
          break
        case 401:
          alert('session expired')
          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          localStorage.removeItem('u_t')
          location.reload()
          break
        case 403:
          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          localStorage.removeItem('u_t')
          location.reload()
          break
        case 404:
          alert('page not exist')
          break
        case 502:
          setTimeout(() => {
            router.replace({
              path: '/',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          localStorage.removeItem('u_t')
          location.reload()
      }
      return Promise.reject(error)
    }
    // if (error.response.status !== 422) {
    //   alert('Session Expired.')
    //   localStorage.removeItem('u_t')
    //   localStorage.removeItem('s_t')
    //   router.push({ name: 'Signin' })
    //   location.reload()
    // }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // return Promise.reject(error)
  })
}

export { axiosInterceptorRequest, axiosInterceptorResponse, axiosBaseUrl }
