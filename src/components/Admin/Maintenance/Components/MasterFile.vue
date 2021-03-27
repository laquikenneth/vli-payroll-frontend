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
            @click="submit"
          >

              Reset

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

          <h4>Basic Information</h4>

        </v-col>

      </v-row>

      <v-row class='mt-2'>

      </v-row>

      <!-- Employee Code -->
      <v-row class='mt-2'>

        <v-col cols='3'>

          <v-text-field
            v-model='form.empl_cde'
            dense
            outlined
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
          label='Reset Password'
          required
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
              label='Updated by'
              :readonly="true"
            />

          </v-col>

        </v-row>

      </v-form>

    </v-container>

   </v-card>

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
      btn_disabled: false,
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
  methods: {
    async subscriber () {
      try {
        axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('u_t')
        if (this.$store.getters.systemLoggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('u/maintenance/masterfile/', {
              params: {
                empl_cde: this.id
              }
            })
              .then(response => {
                this.client = response.data
                Object.keys(this.client).forEach(key => {
                  this.form[key] = this.client[key]
                })
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
