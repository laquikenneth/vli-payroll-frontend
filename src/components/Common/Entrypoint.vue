<template>

  <div class="welcome-center mt-16">

    <v-main>

      <v-container>

        <transition
          mode='out-in'
          name='fade'
        >

          <div class='welcome-text font-weight-light welcome-center' :key='text'>{{ text }}</div>

        </transition>

      </v-container>

    </v-main>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EntryPoint',
  data () {
    return {
      text: 'Welcome Back!',
      show_welcome: true
    }
  },
  computed: {
    ...mapGetters({
      user: 'authenticatedUser'
    })
  },
  methods: {
    dashboard () {
      if (this.user.is_admin === 'T') {
        this.$router.push({ name: 'Admin-Dashboard' })
      } else {
        this.$router.push({ name: 'Employee-Dashboard' })
      }
    },
    toggleTransition () {
      this.text = this.text === 'Welcome Back!' ? 'Preparing Your Dashboard' : 'Welcome Back!'
    }
  },
  created () {
    if (localStorage.getItem('u_t') !== null) {
      this.$store.dispatch('authenticatedUser', 'User')
        .then(response => {
          console.log(response)
          setTimeout(() => {
            this.dashboard()
          }, 5000)
          setInterval(() => {
            this.toggleTransition()
          }, 2500)
        })
        .catch(() => {
          this.$router.replace({
            path: '/auth/signin',
            query: {
              redirect: this.$router.currentRoute.fullPath
            }
          })
          localStorage.removeItem('u_t')
          location.reload()
        })
    }
  }
}
</script>
<style>
.welcome-center {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.welcome-text {
  font-size: 35px;
  font-weight: 650;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
