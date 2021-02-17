<template>
  <v-app>
      <div class="d-flex align-center">

      </div>

      <v-spacer></v-spacer>

    <v-main>
      <Email/>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Email from './components/Email'

export default {
  name: 'App',

  components: {
    // HelloWorld
    Email
  },

  data: () => ({
    //
  })
}
</script>
