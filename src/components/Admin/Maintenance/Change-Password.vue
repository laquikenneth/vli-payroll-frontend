<template>

  <div>

      <v-card
        class="mx-auto my-auto mt-16"
        width="360"
        outlined
        :loading="loading"
        elevation="3"
      >

        <v-card-title>Change Password</v-card-title>

          <v-card-text>

            <v-container>

              <v-form
                class="mt-n4"
                ref="form"
                v-model="formHasErrors"
                lazy-validation
              >

                <!-- old password field -->
                <v-row class="mt-n4">
                  <v-col>

                    <v-text-field
                      v-model="form.old_password"
                      type="password"
                      dense
                      label="Enter your Old Password"
                      outlined
                      required
                    />

                  </v-col>

                </v-row>

                <!-- new password field-->
                <v-row class="mt-n4">

                  <v-col>

                    <v-text-field
                      v-model="form.new_password"
                      type="password"
                      dense
                      label="New Password"
                      required
                      outlined
                    />

                  </v-col>

                </v-row>

                <!-- verify new password field-->
                <v-row class="mt-n4">

                  <v-col>

                    <v-text-field
                      v-model="form.verify_new_password"
                      type="password"
                      dense
                      label="Re-enter New Password"
                      required
                      outlined
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

  </div>

</template>
<script>

export default {
  name: 'changePassword',
  data () {
    return {
      rules: {
        required: value => !!value || 'Required.',
        email: [
          value => !!value || 'Email is required',
          value => /.+@.+\..+/.test(value) || 'E-mailmust be valid'
        ],
        password: [
          value => !!value || 'Password is required'
        ]

      },
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
      this.btn_disabled = true
      this.$store.dispatch('systemLogin', {
        email: this.form.email,
        password: this.form.password
      })
        .then(() => {
          this.loading = false
          this.readonly = true
          this.$router.push({ name: 'System-Dashboard' })
        })
    }
  }
}
</script>
