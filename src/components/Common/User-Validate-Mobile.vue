<template>

  <div>

    <v-container>

      <v-card
        class="mx-auto my-auto mt-16"
        width="360"
        outlined
        :loading="loading"
        elevation="3"
      >

        <v-card-title>Verify your mobile number</v-card-title>

          <!-- <v-card-text> -->

            <v-container>

              <v-form
                ref="form"
                v-model="formHasErrors"
              >

                <!-- email -->
                <v-text-field
                  v-model="form.mobile"
                  :rules='rules.mobile'
                  dense
                  outlined
                  required
                  maxlength="11"
                  label="Mobile Number"
                  counter
                  @keydown.enter="submit"
              />

                <!-- button -->
                <v-card-actions>

                  <v-btn
                    @click="validate"
                    block
                    medium
                    color="primary"
                    :disabled="!formHasErrors || btn_disabled"
                  >

                    Validate

                  </v-btn>

                </v-card-actions>

              </v-form>

            </v-container>

          <!-- </v-card-text> -->

      </v-card>

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

    </v-container>

  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Common-Validate-Mobile',
  data () {
    return {
      id: this.$route.params.id,
      form: {
        mobile: ''
      },
      rules: {
        required: value => !!value || 'Required.',
        mobile: [
          value => /^[0-9]+$/.test(value) || 'Input must be a number',
          value => !!value || 'Mobile number is required.',
          value => value.length === 11 || 'Mobile number must be 11 digits'
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
    async validate () {
      try {
        await new Promise((resolve, reject) => {
          axios.post('auth/validate/mobile/', {
            data: {
              id: this.id,
              mobile: this.form.mobile
            }
          })
            .then(response => {
              // if (this.form.mobile === response.data) {
              this.markEmailAsVerified()
              // }
              resolve(response)
            })
            .catch(error => {
              this.snackbarText = error.response.data.message
              this.snackbar = true
              reject(error)
            })
        })
      } catch (error) {
      }
    },
    markEmailAsVerified () {
      // window.location.href = 'https://vli-payroll-api-bziyh.ondigitalocean.app/verify-user-email/' + this.id
      window.location.href = 'http://localhost:8000/verify-user-email/' + this.id
    }
  }
}
</script>
