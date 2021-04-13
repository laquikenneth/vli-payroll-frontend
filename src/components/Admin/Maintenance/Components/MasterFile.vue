<template>

  <div>

  <v-card
    class='mx-auto'
    outlined
    :loading='loading'
    elevation='3'

  >

    <v-card-title>

      Employee Masterfile

      <v-spacer />

        <v-btn class="mr-2"
          medium
          color="primary"
          :disabled="!formHasErrors || btn_disabled"
          v-show="textfield_disabled"
          @click="textfield_disabled = false"
        >

          Reset Password

        </v-btn>

        <v-btn class="mr-2"
          medium
          color="primary"
          :disabled="!formHasErrors || btn_disabled"
          v-show="password_button"
          @click="textfield_disabled = true, update_password()"
        >

          Save Password

        </v-btn>

        <v-btn
          medium
          color="primary"
          :disabled="!formHasErrors || btn_disabled"
          @click="submit"
        >

          Save

        </v-btn>

    </v-card-title>

    <v-divider></v-divider>

    <v-container>

      <v-form
        ref='form'
        v-model="formHasErrors"
      >
      <v-row class='mt-2'>

        <v-col cols='4'>

          <h4>Basic Information (#{{ this.form.cntrl_no }})</h4>

        </v-col>

      </v-row>

      <!-- Employee Code -->
      <v-row class='mt-2'>

        <v-col cols='3'>

          <v-text-field
            v-model='form.empl_cde'
            dense
            outlined
            filled

            label='Employee Code'
            :readonly="true"
          />

        </v-col>

        <!-- First Name -->
        <v-col cols='3'>

          <v-text-field
            v-model='form.frst_nme'
            dense
            outlined
            filled
            label='First Name'
            :readonly="true"
          />

        </v-col>

        <!-- Last Name -->
        <v-col cols='3'>

          <v-text-field
            v-model='form.last_nme'
            dense
            outlined
            filled
            label='Last Name'
            :readonly="true"
          />

        </v-col>

        <!-- Middle Name -->
        <v-col cols='3'>

          <v-text-field
            v-model='form.midl_nme'
            dense
            outlined
            filled
            label='Middle Name'
            :readonly="true"
          />

        </v-col>

      </v-row>

    <v-divider></v-divider>
     <v-row class='mt-4'>

        <v-col cols='4'>

          <h4>Login Information</h4>

        </v-col>

      </v-row>
      <v-row class='mt-2'>

      <!-- Email -->
      <v-col cols='6'>

        <v-text-field
          v-model='form.email'
          dense
          outlined
          filled
          label='Email'
          :readonly="true"
        />

      </v-col>

      <!-- Password -->
      <v-col cols='6'>

        <v-text-field
          v-model='form.password'
          dense
          outlined
          label='New Password'
          required
          :disabled="textfield_disabled"
        />

      </v-col>

    </v-row>

      <!-- Username -->
      <v-row class='mt-n5'>
      <v-col cols='3'>

        <v-text-field
          v-model='form.username'
          dense
          outlined
          filled
          label='Username'
          :readonly="true"
        />

      </v-col>

      <!-- Mobile Number -->
      <v-col cols='3'>

        <v-text-field
          v-model='form.mobile__'
          dense
          outlined
          filled
          label='Mobile Number'
          :readonly="true"
        />

      </v-col>

         <!-- Disable -->
        <v-col cols='3'>

          <v-select
              v-model="form.disabled"
              :items="disabled"
              label="Disable"
              item-text="descript"
              item-value="id"
              dense
              outlined
            />

        </v-col>

        <!-- Verified-->
          <v-col cols='3'>

            <v-select
                v-model="form.verified"
                :items="verified"
                label="Verified"
                item-text="descript"
                item-value="id"
                dense
                outlined
                filled
                :readonly="true"
              />

          </v-col>

        </v-row>

        <!-- is admin -->
        <v-row class='mt-n5'>
          <v-col cols='4'>

            <v-select
                v-model="form.is_admin"
                :items="is_admin"
                label="Is Admin"
                item-text="descript"
                item-value="id"
                dense
                outlined
              />

          </v-col>

          <!-- Log in limit -->
            <v-col cols='4'>

              <v-text-field
                v-model="form.login_limit"
                label="Login Limit"
                dense
                outlined
              />

            </v-col>

          <!-- Email Verified at -->
            <v-col cols='4'>

            <v-text-field
              v-model='form.email_verified_at'
              dense
              outlined
              filled
              label='Email Verified at'
              :readonly="true"

            />

            </v-col>

        </v-row>

        <!-- Created at -->
        <v-row class='mt-n5'>
          <v-col cols='3'>
            <v-text-field
              v-model='form.created_at'
              dense
              outlined
              filled
              label='Created at'
              :readonly="true"
            />

          </v-col>

          <!-- Created by -->
          <v-col cols='3'>

            <v-text-field
              v-model='form.created_by'
              dense
              outlined
              filled
              label='Created by'
              :readonly="true"
            />

          </v-col>

        <!-- Updated at -->
        <v-col cols='3'>

          <v-text-field
            v-model='form.updated_at'
            dense
            outlined
            filled
            label='Updated at'
            :readonly="true"
          />

        </v-col>

        <!-- Updated by-->

          <v-col cols='3'>

            <v-text-field
              v-model='form.updated_by'
              dense
              outlined
              filled
              label='Updated by'
              :readonly="true"
            />

          </v-col>

        </v-row>

      </v-form>

    </v-container>

  </v-card>

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

  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Admin-MasterFile-Edit',
  props: {
    id: {
      type: [String, Number]
    }
  },
  data () {
    return {
      loading: true,
      multiLine: true,
      snackbar: false,
      snackbarText: '',
      btn_disabled: false,
      textfield_disabled: true,
      formHasErrors: true,
      masterfile: {},
      form: {
        empl_cde: '',
        frst_nme: '',
        last_nme: '',
        midl_ini: '',
        midl_nme: '',
        email: '',
        username: '',
        mobile__: '',
        password: '',
        is_admin: '',
        login_limit: '4',
        disabled: 'F',
        created_at: '',
        created_by: '',
        verified: '',
        email_verified_at: '',
        updated_at: '',
        updated_by: ''
      },
      is_admin: [
        {
          id: 'T',
          descript: 'Yes'
        },
        {
          id: 'F',
          descript: 'No'
        }
      ],
      disabled: [
        {
          id: 'T',
          descript: 'Yes'
        },
        {
          id: 'F',
          descript: 'No'
        }
      ],
      verified: [
        {
          id: 'T',
          descript: 'Yes'
        },
        {
          id: 'F',
          descript: 'No'
        }
      ]
    }
  },
  computed: {
    password_button () {
      return this.form.password.length !== 0
    }
  },
  methods: {
    update_password () {
      axios.post('u/admin/update-password', {
        verify_new_password: this.form.password
      })
        .then(() => {
          this.snackbar = true
          this.snackbarText = 'Password updated successfully!'
          this.form.password = ''
        })
        .catch(error => {
          this.snackbarText = error.response.data.message
        })
    },
    async subscriber () {
      try {
        this.loading = true
        if (this.$store.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('u/maintenance/masterfile/edit', {
              params: {
                vli_empl_mst: this.$route.params.id
              }
            })
              .then(response => {
                this.masterfile = response.data
                Object.keys(this.masterfile).forEach(key => {
                  this.form[key] = this.masterfile[key]
                })
                this.loading = false
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    async create_subscriber () {
      this.btn_disabled = true
      try {
        axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('s_t')
        if (this.$store.getters.systemLoggedIn) {
          await new Promise((resolve, reject) => {
            axios.post('s/subscriber/create', this.form)
              .then(response => {
                this.$router.push({ name: 'System-Client-Approved' })
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (erro) {
      }
    },
    submit () {
      this.$refs.form_1.validate() ? this.save() : this.$refs.form_1.validate()
    },
    submit2 () {
      this.$refs.form_2.validate() ? this.save() : this.$refs.form_2.validate()
    },
    submit3 () {
      this.$refs.form_3.validate() ? this.create_subscriber() : this.$refs.form_3.validate()
    }
  },
  created () {
    this.subscriber()
  }
}
</script>
