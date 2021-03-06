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

          <v-card-text>

            <v-container>

              <v-form
                ref="form"
                v-model="formHasErrors"
              >

                <!-- email -->
                <v-text-field
                  v-model="form.mobile"
                  dense
                  outlined
                  label="Mobile Number"
                  @keydown.enter="submit"
              />

                <!-- button -->
                <v-card-actions>

                  <v-btn
                    @click="validate"
                    block
                    medium
                    rounded
                    color="primary"
                  >

                    Validate

                  </v-btn>

                </v-card-actions>

              </v-form>

            </v-container>

          </v-card-text>

      </v-card>

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
    async validate () {
      try {
        await new Promise((resolve, reject) => {
          axios.get('u/validate/mobile/' + this.$route.params.id)
            .then(response => {
              if (this.form.mobile === response.data) {
                this.markEmailAsVerified()
              }
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      } catch (error) {
      }
    },
    markEmailAsVerified () {
      window.location.href = 'http://localhost:8000/verify-user-email/' + this.id
    }
  }
}
</script>
