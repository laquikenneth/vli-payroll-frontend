<template>

  <v-app>

    <v-app-bar
      app
      flat
      color="white"
      outlined
    >
      <v-spacer />

        <!-- sigin home -->
        <v-btn
          class="text--secondary"
          medium
          text
          v-if="signup"
          @click="login()"
        >

          Sign In

        </v-btn>

        <span class="text --disabled" v-if="signup">|</span>

        <!-- signup -->
        <v-btn
          class="text--secondary"
          medium
          text
          v-if="signup"
          :to="{ name: 'Signup' }"
        >

          Create an Account

        </v-btn>

        <!-- sign after create-->
        <v-btn
          class="mr-2 text--secondary"
          medium
          text
          v-else
          @click="login()"
        >

          Sign in

        </v-btn>

    </v-app-bar>

    <!-- root layout -->
    <v-main>

      <v-container fluid pa-0>

        <!-- <v-layout justify-center align-center> -->

        <!-- if using vue-router -->
        <router-view></router-view>

        <!-- </v-layout> -->

      </v-container>

    </v-main>

  </v-app>

</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      signup: true
    }
  },
  computed: {
    // signup () {
    //   return this.$route.name !== 'Signup'
    // }
  },
  methods: {
    login () {
      this.$router.push({ name: 'Signin' }).catch(() => {})
      // console.log(localStorage.getItem('s_t'))
      // console.log(localStorage.getItem('u_t'))
      // if (this.$store.state.token !== '' || this.$store.state.systemToken !== null) {
      //   this.$router.push({ name: 'EntryPoint' })
      // } else {
      //   this.$router.push({ name: 'Signin' }).catch(() => {})
      // }
    }
  }
}
</script>
