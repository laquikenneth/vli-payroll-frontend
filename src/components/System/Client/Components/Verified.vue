<template>

  <div>

    <v-card
      class='mx-auto'
      outlined
      :loading='loading'
      elevation='3'

    >

    <v-card-title>

      Edit Records

      <v-spacer />

        <v-btn class="mr-2"
          medium
          color="primary"
          :disabled="!formHasErrors || btn_disabled"
          @click="submit"
        >

          Save

        </v-btn>

        <v-btn
          medium
          color="primary"
          :disabled="!formHasErrors || btn_disabled"
          @click="submit"
        >

          Save and Approve

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

          <h4>Company Profile</h4>

        </v-col>

      </v-row>

      <v-row class='mt-2'>

      </v-row>

      <!-- ID/Control Number -->
      <v-row class='mt-2'>

        <v-col cols='3'>

          <v-text-field
            v-model="client.cntrl_no"
            label="ID"
            dense
            outlined
            filled
            :readonly="true"
          />

        </v-col>

        <!-- Employee Code -->
        <v-col cols='3'>

          <v-text-field
            v-model="form.empl_cde"
            label="Employee Code"
            :rules="rules.empl_cde"
            dense
            filled
            :readonly="true"
            outlined
            required
          />

        </v-col>

        <!-- First Name -->
        <v-col cols='3'>

          <v-text-field
            v-model="form.frst_nme"
            label="First Name"
            :rules="rules.frst_nme"
            dense
            filled
            :readonly="true"
            outlined
            required
          />

        </v-col>

        <!-- Last Name -->
        <v-col cols='3'>

          <v-text-field
            v-model="form.last_nme"
            label="Last Name"
            :rules="rules.last_nme"
            dense
            outlined
            required
            filled
            :readonly="true"
          />

        </v-col>

      </v-row>

      <!-- Email -->
      <v-row class='mt-n5'>

        <v-col cols='3'>

          <v-text-field
            v-model="form.email"
            label="Email"
            dense
            outlined
            filled
            :readonly="true"
          />

        </v-col>

        <!-- Mobile Number -->
        <v-col cols='3'>

          <v-text-field
            v-model="form.mobile__"
            label="Mobile Number"
            dense
            outlined
            filled
            :readonly="true"
          />

        </v-col>

        <!-- Address -->
        <v-col cols='6'>

          <v-text-field
            v-model="form.address_"
            label="Address"
            :rules="rules.address_"
            dense
            outlined
            filled
            :readonly="true"
            required
          />

        </v-col>

      </v-row>

      <!-- Company Name -->
      <v-row class='mt-n5'>

        <v-col cols='5'>

          <v-text-field
            v-model="form.co_name_"
            label="Company Name"
            dense
            outlined
            filled
            :readonly="true"
          />

        </v-col>

        <!-- Company Short Name -->
        <v-col cols='4'>

          <v-text-field
            v-model="form.co_sname"
            label="Company Short Name"
            :rules="rules.co_sname"
            dense
            outlined
            required
          />

        </v-col>

        <!-- Position -->
        <v-col cols='3'>

          <v-text-field
            v-model="form.pos_desc"
            label="Position"
            :rules="rules.pos_desc"
            dense
            outlined
            filled
            :readonly="true"
            required
          />

        </v-col>

      </v-row>

    <v-divider></v-divider>
     <v-row class='mt-4'>

        <v-col cols='4'>

          <h4>Subscriber</h4>

        </v-col>

      </v-row>

      <v-row class='mt-2'>

      <!-- Email Verified at -->
      <v-col cols='3'>

        <v-text-field
          v-model="form.email_verified_at"
          label="Email Verified at"
          dense
          outlined
          filled
          :readonly="true"
        />

      </v-col>

      <!-- Approved at -->
      <v-col cols='3'>

        <v-text-field
          v-model="form.approved_at"
          label="Approved at"
          dense
          outlined
          filled
          :readonly="true"
        />

      </v-col>

      <!-- Approved by -->
      <v-col cols='3'>

        <v-text-field
          v-model="form.approved_by"
          label="Approved by"
          dense
          outlined
          filled
          :readonly="true"
        />

      </v-col>

      <!-- Status -->
      <v-col cols='3'>

        <v-select
          v-model="client.vli_register_status"
          item-text="descript"
          item-value="id"
          :items="vli_register_status"
          :rules="[value => !!value || 'Status is required']"
          label="Status"
          filled
          :readonly="true"
          dense
          outlined
        />

      </v-col>

    </v-row>

      <!-- Action -->
      <v-row class='mt-n5'>
        <v-col cols='4'>

          <v-select
            v-model="form.status__"
            item-text="descript"
            item-value="id"
            :items="vli_subs_hdr_status"
            :rules="[value => !!value || 'Status is required']"
            label="Action"
            dense
            outlined
          />

        </v-col>

      <!-- Start Trial -->
      <v-col cols='4'>

        <v-menu
          v-model="strt_trial_Menu"
          :close-on-content-click="true"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >

          <template v-slot:activator="{ on, attrs }">

            <v-text-field
              v-model="form.strt_trial"
              label="Start Trial"
              :rules="[value => !!value || 'Start Trial Date is required']"
              outlined
              readonly
              dense
              v-bind="attrs"
              v-on="on"
            />

          </template>

          <v-date-picker
            v-model="form.strt_trial"
            @input="strt_trial_Menu= false"
          >

          </v-date-picker>

        </v-menu>

      </v-col>

      <!-- Last Trial -->
        <v-col cols='4'>

          <v-menu
            v-model="last_trial_Menu"
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >

            <template v-slot:activator="{ on, attrs }">

              <v-text-field
                v-model="form.last_trial"
                label="Last Trial"
                :rules="[value => !!value || 'Last trial is required']"
                outlined
                readonly
                dense
                v-bind="attrs"
                v-on="on"
              />

            </template>

            <v-date-picker
              v-model="form.last_trial"
              @input="last_trial_Menu= false"
            />

            </v-menu>

          </v-col>

        </v-row>

        <!-- Login Limit -->
        <v-row class='mt-n5'>
          <v-col cols='3'>

            <v-text-field
              v-model="form.login_limit"
              label="Log in Limit"
              :rules="rules.login_limit"
              dense
              outlined
              filled
              :readonly="true"
            />

          </v-col>

          <!-- Admin limit -->
            <v-col cols='3'>

              <v-text-field
                v-model="form.admin_limit"
                label="Admin Limit"
                :rules="rules.admin_limit"
                dense
                outlined
                filled
                :readonly="true"
              />

            </v-col>

        </v-row>

        <v-divider></v-divider>
        <v-row class='mt-4'>

            <v-col cols='4'>

              <h4>Settings</h4>

            </v-col>

          </v-row>

          <v-row class='mt-2'>

          <!-- Client token -->
          <v-col cols='5'>

            <v-text-field
              v-model="form.client_token"
              label="Client Token"
              dense
              outlined
              filled
              :readonly="true"
            />

          </v-col>

          <!-- Disabled -->
          <v-col cols='3'>

            <v-select
              v-model="form.disabled"
              :items="disabled"
              :rules="[value => !!value || 'This field is required']"
              label="Disable"
              item-text="descript"
              item-value="id"
              dense
              outlined
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
  name: 'Verified-Edit',
  props: {
    id: {
      type: [String, Number]
    }
  },
  data () {
    return {
      rules: {
        required: value => !!value || 'Required',
        co_sname: [
          value => !!value || 'Company Name is required.',
          value => value.length <= 30 || 'Company Name must be less than 30 characters'
        ]
      },
      formHasErrors: true,
      loading: false,
      btn_disabled: false,
      valid_form: false,
      valid_form_2: false,
      valid_form_3: false,
      client: {},
      form: {
        co_name_: '',
        co_sname: '',
        login_limit: '4',
        admin_limit: '1',
        strt_trial: '',
        last_trial: '',
        status__: '',
        disabled: 'F',
        client_token: ''
      },
      strt_trial_Menu: false,
      last_trial_Menu: false,
      tab: 1,
      tab_header: [
        'General', 'Subscriber Info', 'Settings'
      ],
      vli_register_status: [
        {
          id: '1',
          descript: 'Pending'
        },
        {
          id: '2',
          descript: 'Verified'
        },
        {
          id: '3',
          descript: 'Approved'
        }
      ],
      vli_subs_hdr_status: [
        {
          id: '1',
          descript: 'Demo'
        },
        {
          id: '2',
          descript: 'Subscriber/Active'
        },
        {
          id: '3',
          descript: 'On hold'
        },
        {
          id: '4',
          descript: 'Terminated'
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
      ]
    }
  },
  methods: {
    async subscriber () {
      this.loading = true
      try {
        axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('s_t')
        if (this.$store.getters.systemLoggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('s/client/verified', {
              params: {
                cntrl_no: this.id
              }
            })
              .then(response => {
                this.client = response.data
                Object.keys(this.client).forEach(key => {
                  this.form[key] = this.client[key]
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
                this.$router.push({ name: 'System-Client-Verified' })
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
      this.$refs.form.validate() ? this.create_subscriber() : this.$refs.form.validate()
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
