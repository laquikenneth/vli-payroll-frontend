<template>

  <div id="center">

    <v-main>

      <v-container>

        <transition
          mode='out-in'
          name='fade'
        >

          <div class='welcome-text' :key='text'>{{ text }}</div>

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
      text: 'Welcome back!',
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
      this.text = this.text === 'Welcome back!' ? 'Preparing your dashboard...' : 'Welcome back!'
    }
  },
  created () {
    setTimeout(() => {
      this.dashboard()
    }, 5000)
    setInterval(() => {
      this.toggleTransition()
    }, 2500)
  }
}
</script>
<style>
#center {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 200px;
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
