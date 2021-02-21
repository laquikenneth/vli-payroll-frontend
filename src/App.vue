<template>

  <v-app>

    <v-app-bar
      app
      color="blue-grey lighten-5"
      flat
    >

      <v-spacer />

        <!-- sigin home -->
        <v-btn
          medium
          text
          v-if="signup"
          :to="{ name: 'Signin' }"
        >

          Sign In

        </v-btn>

        <!-- signup -->
        <v-btn
          medium
          text
          v-if="signup"
          :to="{ name: 'Signup' }"
        >

          Create an Account

        </v-btn>

        <!-- sign after create-->
        <v-btn
          medium
          text
          v-else
          :to="{ name: 'Signin' }"
        >

          Sign in

        </v-btn>

    </v-app-bar>

    <!-- root layout -->
    <v-main>

      <v-container>

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
    }
  },
  computed: {
    signup () {
      return this.$route.name !== 'Signup'
    }
  }
}
</script>
