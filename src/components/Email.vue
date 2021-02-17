<template>

  <div>

    <v-container>

      <v-card
        class="mx-auto mt-5"
        width="500px"
      >

        <v-card-title>Create an account</v-card-title>

          <v-container>

            <v-text-field
              dense
              outlined
              label="Email"
            />

            <v-card-action>

              <v-btn
                block
                large
                color="primary"
              >
                Sign Up
              </v-btn>

            </v-card-action>

          </v-container>

      </v-card>

    </v-container>

  </div>

</template>

<script>
export default {
  name: 'Email',
  data () {
    return {
      email: ''
    }
  }
}
</script>
