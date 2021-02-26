<template>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Subscriber',
  props: {
    id: {
      type: Number
    }
  },
  data () {
    return {
      form: {
        cntrl_no: ''
      }
    }
  }
  // methods: {
  //   async subscriber (id) {
  //     try {
  //       axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('u_t')
  //       if (this.$store.getters.systemLoggedIn) {
  //         await new Promise((resolve, reject) => {
  //           axios.get('')
  //         })
  //       }
  //     } catch (error) {
  //     }
  //   }

  // }
}
</script>
