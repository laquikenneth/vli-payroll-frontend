<template>

  <div>

    <v-card
      class="mx-auto my-auto mt-16"
      width="360"
      outlined
      :loading="loading"
      elevation="3"
    >

      <v-card-title>Control Panel</v-card-title>

        <v-card-text>

          <v-container>

            <v-form
              class="mt-n4"
              ref="form"
              v-model="formHasErrors"
              lazy-validation
            >

              <!-- email field -->
              <v-row class="mt-n4">
                <v-col>

                  <v-text-field
                    v-model="form.email"
                    :rules="rules.email"
                    dense
                    label="Email"
                    outlined
                    required
                    :readonly="readonly"
                  />

                </v-col>

              </v-row>

              <!-- password field-->
              <v-row class="mt-n4">

                <v-col>

                  <v-text-field
                    v-model="form.password"
                    type="password"
                    dense
                    label="Password"
                    :rules="rules.password"
                    required
                    outlined
                    @keydown.enter="login"
                    :readonly="readonly"
                  />

                </v-col>

              </v-row>

              <!-- login button -->

              <v-card-actions>

                <v-row class="mt-n4">

                  <v-col>

                    <v-btn
                      @click="submit"
                      block
                      medium
                      rounded
                      color="primary"
                      :disabled="!formHasErrors || btn_disabled"
                      form="login"
                    >

                      Sign in

                    </v-btn>

                  </v-col>

                </v-row>

              </v-card-actions>

            </v-form>

          </v-container>

        </v-card-text>

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

  </div>

</template>

<script>

export default {
  name: 'Email',
  data () {
    return {
      rules: {
        required: value => !!value || 'Required.',
        email: [
          value => !!value || 'Email is required.',
          value => /.+@.+\..+/.test(value) || 'Email must be valid.'
        ],
        password: [
          value => !!value || 'Password is required.'
        ]

      },
      multiLine: true,
      snackbar: false,
      snackbarText: '',
      btn_disabled: false,
      formHasErrors: false,
      readonly: false,
      loading: false,
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate() ? this.login() : this.$refs.form.validate()
    },
    login () {
      this.loading = true
      this.$store.dispatch('systemLogin', {
        email: this.form.email,
        password: this.form.password
      })
        .then(() => {
          this.loading = false
          // this.readonly = true
          if (this.$store.getters.error_message) {
            this.snackbar = true
            this.snackbarText = this.$store.getters.error_message
          } else {
            this.$router.push({ name: 'System-Dashboard' })
          }
        })
    }
  }
}
</script>
