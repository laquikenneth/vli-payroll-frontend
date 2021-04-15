<template>

  <div>

    <v-card
      class="mx-auto my-auto mt-16"
      width="360"
      outlined
      :loading="loading"
      elevation="3"
    >

      <v-card-title>Sign in to your account</v-card-title>

        <!-- <v-card-text> -->

          <v-container class
          >

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

  </div>

</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Email',
  data () {
    return {
      rules: {
        required: value => !!value || 'Required.',
        email: [
          value => !!value || 'Email is required',
          value => /.+@.+\..+/.test(value) || 'E-mail must be valid'
        ],
        password: [
          value => !!value || 'Password is required'
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
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      user: 'AUTHENTICATED_USER',
      error: 'AUTH_MESSAGE'
    })
  },
  methods: {
    submit () {
      this.$refs.form.validate() ? this.login() : this.$refs.form.validate()
    },
    login () {
      this.loading = true
      this.btn_disabled = true
      this.$store.dispatch('AUTHENTICATE', {
        email: this.form.email,
        password: this.form.password
      })
        .then(() => {
          this.loading = false
          this.readonly = true
          if (!this.error) {
            this.$store.dispatch('AUTH_USER', 'User')
              .then(() => {
                if (this.user.is_admin === 'T') {
                  this.$router.push({ name: 'Admin-Dashboard' })
                } else {
                  this.$router.push({ name: 'Employee-Dashboard' })
                }
              })
          } else {
            this.btn_disabled = false
            this.readonly = false
            this.snackbar = true
            this.snackbarText = this.error
          }
        })
    }
  }
}
</script>
