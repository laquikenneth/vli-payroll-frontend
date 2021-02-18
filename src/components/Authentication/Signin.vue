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

        <v-card-title>Sign in to your account</v-card-title>

          <v-card-text>

            <v-form @submit.prevent="login" id="login" class="mt-n4">

              <!-- email field -->
              <v-row class="mt-n4">
                <v-col>

                  <v-text-field
                    v-model="email"
                    :rules="rules.email"
                    dense
                    label="Email"
                    outlined
                    required
                  />

                </v-col>

              </v-row>

              <!-- password field-->
              <v-row class="mt-n4">

                <v-col>

                  <v-text-field
                    v-model="password"
                    id="password"
                    type="password"
                    dense
                    label="Password"
                    :rules="rules.password"
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
                      type="submit"
                      color="primary"
                      form="login"
                      btn_disabled
                      block
                      rounded
                    >

                      Sign in

                    </v-btn>

                  </v-col>

                </v-row>

              </v-card-actions>

            </v-form>

          </v-card-text>

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
      password: '',
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
      loading: false,
      btn_disabled: false
    }
  },
  submit () {
    this.validate() ? this.save() : this.validate()
  },
  save () {
    this.loading = true
    this.btn_disabled = true
    // axios.post('/appointment/create', this.form)
      .then(response => {
        this.loading = false
        this.snackbar = true
        this.reset()
        response.status === 200 ? this.btn_disabled = false : this.btn_disabled = true
      })
      .catch(e => {
        const backendErrors = e.response.data.errors
        this.errors.push(backendErrors)
      })
  }
}
</script>
