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
        {{ title }}
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
          Please click on the link that we sent to your email account ({{ this.email }}) to verify your email and continue the registration process.
        </v-col>
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
      title: 'A verification link has been sent to your email account.',
      message: 'Please click on the link that we sent to your email account to verify your email and continue the registration process.'
    }
  }
}
</script>
