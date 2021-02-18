<template>

  <div>

    <v-container>

      <v-card
        class="mx-auto mt-16"
        width="360"
        outlined
        :loading="loading"
        elevation="3"
      >

        <v-card-title>Create an account</v-card-title>

          <v-container>

            <v-form
            ref="form"
            v-model="formHasErrors"
            >

              <!-- fields -->
              <v-text-field
              v-model="email"
              :rules="rules.email"
              dense
              outlined
              label="Email"
              required
              :change="submit"
             />

              <!-- button -->
              <v-card-actions>

                <v-btn
                  @click="submit"
                  block
                  large
                  rounded
                  color="primary"
                  :disabled="!formHasErrors || btn_disabled"
                >

                  Sign Up

                </v-btn>

               </v-card-actions>

            </v-form>

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
      email: '',
      rules: {
        required: value => !!value || 'Required.',
        email: [
          value => !!value || 'Email is required',
          value => /.+@.+\..+/.test(value) || 'E-mail must be valid'
        ]

      },
      formHasErrors: false,
      btn_disabled: false,
      loading: false
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate() ? this.save() : this.$refs.form.validate()
    },
    save () {
      this.loading = true
      this.$router.push({ name: 'Register', params: { email: this.email } })
    }
  }
}
</script>
