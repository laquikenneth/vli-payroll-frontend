<template>

  <div>

    <v-alert
      class="mx-auto mt-16"
      width="600px"
      border="top"
      colored-border
      type="success"
      elevation="2"
    >

      <h3>
        {{ title }}
      </h3>

      <v-divider
        class="my-4 info"
        style="opacity: 0.22"
      />

      <v-row
        align="center"
        no-gutters
      >

        <v-col class="grow">

          {{ message }} <router-link :to="{ name: 'Signin' }">Signin</router-link>.

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
      title: 'Congratulations!',
      message: 'Your email address has been verified. You can now '
    }
  }
}
</script>
{{  }}
