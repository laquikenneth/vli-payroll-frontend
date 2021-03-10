<template>

  <div>

    <v-container>

    <v-alert
      class='mx-auto'
      width='450'
      dense
      text
      type="success"
      v-if="verified"
    >

      Your email address was successfully verified.

    </v-alert>

      <v-card
        class='mx-auto'
        width='450'
        outlined
        :loading='loading'
        elevation='3'
      >

        <v-card-title>Register your company</v-card-title>

        <v-card-text>!

          <v-container>

            <v-form
              ref='form'
              v-model="formHasErrors"
            >

              <!-- Email -->
              <v-row class='mt-n5'>

                <v-col>

                  <v-text-field
                    v-model="form.email"
                    :input="store_email"
                    label="Email"
                    outlined
                    readonly
                    dense
                    filled
                  />

                </v-col>

              </v-row>

              <!-- Company Name -->
              <v-row class='mt-n5'>

                <v-col>

                  <v-text-field
                    v-model='form.co_name_'
                    :rules='rules.co_name_'
                    dense
                    outlined
                    label='Company Name'
                    required
                  />

                </v-col>

              </v-row>

              <!-- Address -->
              <v-row class='mt-n5'>

                <v-col cols='6'>

                  <v-text-field
                    v-model='form.address_'
                    :rules='rules.address_'
                    dense
                    outlined
                    label='Address'
                    required
                  />

                </v-col>

                <!-- Zip Code -->
                <v-col cols='6'>

                  <v-text-field
                    v-model='form.zip_code'
                    :rules='rules.zip_code'
                    dense
                    outlined
                    label='Zip Code'
                    required
                  />

                </v-col>

              </v-row>

              <!-- Employee Code -->
              <v-row class='mt-n5'>

                <v-col>

                  <v-text-field
                    v-model='form.empl_cde'
                    :rules='rules.empl_cde'
                    dense
                    outlined
                    label='Employee Code'
                    required
                  />

                </v-col>

              </v-row>

              <!-- First name -->
              <v-row class='mt-n5'>

                <v-col cols='6'>

                  <v-text-field
                    v-model='form.frst_nme'
                    :rules='rules.frst_nme'
                    dense
                    outlined
                    label='First Name'
                    required
                  />

                </v-col>

                <!-- Last Name -->
                <v-col cols='6'>

                  <v-text-field
                    v-model='form.last_nme'
                    :rules='rules.last_nme'
                    dense
                    outlined
                    label='Last Name'
                    required
                  />

                </v-col>

              </v-row>

              <!-- Position -->
              <v-row class='mt-n5'>

                <v-col>

                  <v-text-field
                    v-model='form.position'
                    :rules='rules.position'
                    dense
                    outlined
                    label='Position'
                    required
                  />

                </v-col>

              </v-row>

              <!-- Mobile Number -->
              <v-row class='mt-n5'>

                <v-col>

                  <v-text-field
                    v-model='form.mobile__'
                    :rules='rules.mobile__'
                    dense
                    outlined
                    label='Mobile Number'
                    required
                    maxlength="11"
                    counter
                  />

                </v-col>

              </v-row>

              <!-- Submit Button -->
              <v-card-actions>

                <v-btn
                  block
                  medium
                  rounded
                  color="primary"
                  :disabled="!formHasErrors || btn_disabled"
                  @click="submit"
                >

                  Submit

                </v-btn>

              </v-card-actions>

            </v-form>

          </v-container>

        </v-card-text>

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

    <Registered v-show="show_registered_success"></Registered>

  </div>

</template>

<script>
import axios from 'axios'
import Registered from '@/components/Common/Subscriber-Register-Success.vue'

export default {
  name: 'Register',
  components: {
    Registered
  },
  data () {
    return {
      rules: {
        required: value => !!value || 'Required.',
        co_name_: [
          value => !!value || 'Company Name is required.',
          value => value.length <= 100 || 'Company Name must be less than 100 characters'
        ],
        address_: [
          value => !!value || 'Address is required.',
          value => value.length <= 200 || ' Address must be less than 200 characters'
        ],
        zip_code: [
          value => !!value || 'Zip Code is required.',
          value => value.length <= 4 || 'Zip Code must be less than 4 characters'
        ],
        empl_cde: [
          value => !!value || 'Employee Code is required.',
          value => value.length <= 10 || 'Employee Code must be less than 10 characters'
        ],
        frst_nme: [
          value => !!value || 'First Name is required.',
          value => value.length <= 50 || 'First Name must be less than 50 characters'
        ],
        last_nme: [
          value => !!value || 'Last Name is required.',
          value => value.length <= 50 || 'Last Name must be less than 50 characters'
        ],
        position: [
          value => !!value || 'Position is required.',
          value => value.length <= 50 || 'Position must be less than 50 characters'
        ],
        mobile__: [
          value => /^[0-9]+$/.test(value) || 'Input must be a number',
          value => !!value || 'Mobile number is required.',
          value => value.length === 11 || 'Mobile number must be 11 digits'
        ]
      },
      btn_disabled: false,
      loading: false,
      multiLine: true,
      snackbar: false,
      verified: false,
      formHasErrors: false,
      show_registered_success: false,
      snackbarText: 'Success',
      form: {
        cntrl_no: this.$route.params.id,
        co_name_: '',
        address_: '',
        zip_code: '',
        empl_cde: '',
        frst_nme: '',
        last_nme: '',
        position: '',
        mobile__: '',
        email: this.$route.params.email
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate() ? this.save() : this.$refs.form.validate()
    },
    save () {
      axios.post('/auth/client/register', this.form)
        .then(response => {
          this.loading = false
          this.$router.push({ name: 'Registered-Success' })
        })
        .catch(e => {
          this.btn_disabled = false
        })
    },
    hasVerifiedEmail () {
      this.$store.dispatch('hasVerifiedEmail', this.$route.params.id)
    },
    email () {
      this.form.email = this.$store.getters.email
    }

  },
  created () {
    // this.hasVerifiedEmail()
    // setInterval(this.email(), 1000)
    setTimeout(() => {
      this.verified = false
    }, 5000)
  }
}
</script>
