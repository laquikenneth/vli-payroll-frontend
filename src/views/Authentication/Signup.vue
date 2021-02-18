<template>

  <div>

    <Signup></Signup>

    <v-row class="mt-1">

      <v-col
        align="center"
        justify="center"
      >

        <!-- <h5 class="font-weight-regular grey--text">Forgot your password?</h5> -->
        <v-row>

          <v-col
           align="center"
           justify="center"
          >

            <h5>By clicking "Sign Up", you agree to Treasure's</h5>

          </v-col>

        </v-row>

        <v-row class="mt-n5">

           <v-col
           align="center"
           justify="center"
          >

            <h5>Terms and Conditions and Privacy Policy</h5>

          </v-col>

        </v-row>

      </v-col>

    </v-row>

  </div>

</template>
<script>
import Signup from '@/components/Authentication/Signup.vue'

export default {
  name: 'View-Signup',
  components: {
    Signup
  }
}
</script>
