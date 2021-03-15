<template>

  <div>

    <Signin></Signin>

    <v-row class="mt-1">

      <v-col
        align="center"
        justify="center"
      >

        <a>

          <h5 class="font-weight-regular grey--text">Forgot your password?</h5>

        </a>

      </v-col>

    </v-row>

  </div>

</template>
<script>
import Signin from '@/components/Authentication/User/Signin.vue'

export default {
  name: 'View-Signin',
  components: {
    Signin
  }
}
</script>
