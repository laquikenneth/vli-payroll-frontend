<template>
  <div>

    <v-alert
      class="mx-auto mt-16"
      width="600px"
      border="top"
      colored-border
      type="info"
      elevation="2"
    >
      <h3>
        {{ Title }}
      </h3>

      <v-divider
        class="my-4 info"
        style="opacity: 0.22"
      ></v-divider>

      <v-row
        align="center"
        no-gutters
      >
        <v-col class="grow">
          Please click on the link that we sent to your email account ({{ this.email }}) to verify your email and continue the registration process. <a ref="">Resend Email</a>
        </v-col>
        <!-- <v-spacer></v-spacer>
        <v-col class="shrink">
          <v-btn
            color="info"
            outlined
          >
            Okay
          </v-btn> -->
        <!-- </v-col> -->
      </v-row>
    </v-alert>
    </div>
</template>
<script>

export default {
  name: 'Verify-Email',
  props: {
    email: {
      type: String
    }
  },
  data () {
    return {
      Title: 'A verification link has been sent to your email account.',
      Message: 'Please click on the link that we sent to your email account to verify your email and continue the registration process.'
    }
  }
}
</script>
