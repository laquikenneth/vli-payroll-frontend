<template>

  <div>

    <v-container>

      <v-card
        class="mx-auto my-auto mt-16"
        width="360"
        outlined
        :loading="loading"
        elevation="3"
        v-show="show_signup"
      >

        <v-card-title>Create an account</v-card-title>

          <!-- <v-card-text> -->

            <v-container>

              <v-form
                ref="form"
                v-model="formHasErrors"
              >

                <!-- email -->
                <v-text-field
                  type="email"
                  v-model="form.email"
                  :rules="rules.email"
                  dense
                  outlined
                  label="Corporate Email*"
                  @keydown.enter="submit"
              />

                <!-- button -->
                <v-card-actions>

                  <v-btn
                    @click="submit"
                    block
                    medium
                    color="primary"
                    :disabled="!formHasErrors || btn_disabled"
                  >

                    Sign Up

                  </v-btn>

                </v-card-actions>

              </v-form>

            </v-container>

          <!-- </v-card-text> -->

      </v-card>

    </v-container>

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
    >

      {{ snackbarText }}

      <template v-slot:action="{ attrs }">

        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar= false"
        >

          Close

        </v-btn>

      </template>

    </v-snackbar>

    <VerifyEmail :email="form.email" v-show="show_verification_msg"></VerifyEmail>

  </div>

</template>

<script>
import axios from 'axios'
import VerifyEmail from '@/components/Common/Verify-Email.vue'

export default {
  name: 'Email',
  components: {
    VerifyEmail
  },
  data () {
    return {
      form: {
        email: ''
      },
      rules: {
        required: value => !!value || 'Required.',
        email: [
          value => !!value || 'Email is required',
          value => /.+@.+\..+/.test(value) || 'E-mail must be valid'
        ]

      },
      snackbarText: '',
      loading: false,
      multiLine: true,
      snackbar: false,
      formHasErrors: false,
      btn_disabled: false,
      show_signup: true,
      show_verification_msg: false
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate() ? this.save() : this.$refs.form.validate()
    },
    async save () {
      this.loading = true
      this.btn_disabled = true
      try {
        await new Promise((resolve, reject) => {
          axios.post('/auth/client/register/email', this.form)
            .then(response => {
              this.loading = false
              this.show_signup = false
              this.show_verification_msg = true
              resolve(response)
            })
            .catch(error => {
              this.loading = false
              this.btn_disabled = false
              this.snackbar = true
              this.snackbarText = error.response.data.errors.email[0]
              reject(error)
            })
        })
      } catch (error) {
      }
    }
  }
}
</script>
