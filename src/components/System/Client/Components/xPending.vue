<template>

  <div>

    <v-stepper v-model="tab">

      <v-stepper-header>

        <v-stepper-step
          :complete="tab > 1"
          step="1"
          :editable="valid_form"
        >

          Company Profile

        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          :complete="tab > 2"
          step="2"
          :editable="valid_form"
        >

          Subscriber

        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          step="3"
          :editable="valid_form"
        >

          Settings

        </v-stepper-step>

      </v-stepper-header>

      <!------------------------ content start here -------------------------->
      <v-stepper-items>

        <v-form
          ref="form_1"
          v-model="valid_form"
          >

          <!-- Company Profile Tab -->
          <v-stepper-content step="1">

            <v-row class="mt-2">

              <!-- Control Number -->
              <v-col
                md="3"
              >

                <v-text-field
                  v-model="client.cntrl_no"
                  label="ID"
                  dense
                  outlined
                  filled
                  :readonly="true"
                />

              </v-col>

              <!-- Company name -->
              <v-col
                md="6"
              >

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
              <v-col
                md="3"
              >

                <v-text-field
                  v-model="form.co_sname"
                  label="Company Short Name"
                  :rules="rules.co_sname"
                  dense
                  outlined
                  required
                />

              </v-col>

            </v-row>

            <v-row>

              <!-- Employee Code -->
              <v-col
                md="3"
              >

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
              <v-col
                md="3"
              >

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
              <v-col
                md="3"
              >

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

              <!-- Position -->
              <v-col
                md="3"
              >

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

            <v-row>

              <!-- Address -->
              <v-col
                md="4"
              >

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

              <!-- Email -->
              <v-col
                md="4"
              >

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
              <v-col
                md="4"
              >

                <v-text-field
                  v-model="form.mobile__"
                  label="Mobile Number"
                  dense
                  outlined
                  filled
                  :readonly="true"
                />

              </v-col>

            </v-row>

            <v-card-actions>

              <v-btn
                color="primary"
                :disabled="!valid_form || btn_disabled"
                @click="tab=2, submit()"
              >

                Continue

              </v-btn>

              <v-btn
                text
              >

                Cancel

              </v-btn>

            </v-card-actions>

          </v-stepper-content>

        </v-form>

        <!-- Subscriber -->
          <v-form
          ref="form_2"
          v-model="valid_form_2"
          >
          <v-stepper-content step="2">

            <v-row class= "mt-2">

              <!-- Status -->
              <v-col
                md="3"
              >

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

            <!-- Email Verified At -->
            <v-col
              md="3"
            >

              <v-text-field
                v-model="form.email_verified_at"
                label="Email Verified at"
                dense
                outlined
                filled
                :readonly="true"
              />

            </v-col>

            <!-- Approved At -->
            <v-col
              md="3"
            >

              <v-text-field
                v-model="form.approved_at"
                label="Approved at"
                dense
                outlined
                filled
                :readonly="true"
              />

            </v-col>

            <!-- Approved By -->
            <v-col
              md="3"
            >

              <v-text-field
                v-model="form.approved_by"
                label="Approved by"
                dense
                outlined
                filled
                :readonly="true"
              />

            </v-col>

          </v-row>

          <v-row>

            <!-- Action -->
            <v-col
              md="3"
            >

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
            <v-col
              md="5"
            >

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
            <v-col
              md="4"
            >

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

          <v-row>

            <!-- Log in Limit -->
            <v-col
              md="2"
            >

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

            <!-- Admin Limit -->
            <v-col
              md="2"
            >

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

          <v-btn
            color="primary"
            :disabled="!valid_form_2 || btn_disabled"
            @click="tab=3, submit2()"
          >

            Continue

          </v-btn>

          <v-btn
            text
          >

            Cancel

          </v-btn>

          </v-stepper-content>

          </v-form>

        <!-- Settings -->
        <v-form
          ref="form_3"
          v-model="valid_form_3"
          >
        <v-stepper-content step="3">

          <v-row class="mt-2">

          <!-- Client token -->
          <v-col
            md="6"
          >

            <v-text-field
              v-model="form.client_token"
              label="Client Token"
              :disabled="true"
              dense
              outlined
            />

          </v-col>

          <!-- Disabled -->
          <v-col
            md="4"
          >

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

        <v-btn
          color="primary"
          class="mr-2"
          :disabled="!valid_form_3 || btn_disabled"
          @click="submit3()"
        >

          Save

        </v-btn>

        <v-btn
          color="primary"
          class="mr-2"
          :disabled="!valid_form_3 || btn_disabled"
          @click="submit3()"
        >

          Save and Approve

        </v-btn>

        <v-btn
          text
        >

          Cancel

        </v-btn>

        </v-stepper-content>

        </v-form>

      </v-stepper-items>

    </v-stepper>

  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Pending-Edit',
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
        pos_desc: [
          value => !!value || 'Position is required.',
          value => value.length <= 50 || 'Position must be less than 50 characters'
        ],
        address_: [
          value => !!value || 'Address is required.',
          value => value.length <= 200 || 'Address must be less than 200 characters'
        ],
        login_limit: [
          value => !!value || 'Login Limit is required.',
          value => /^[0-9]+$/.test(value) || 'Must be number.'
        ],
        admin_limit: [
          value => !!value || 'Admin Limit is required.',
          value => /^[0-9]+$/.test(value) || 'Must be number.'
        ],
        client_token: [
          value => !!value || 'Client Token is required.',
          value => value.length <= 50 || 'Client Token must be less than 50 characters'
        ]
      },
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
      try {
        axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('s_t')
        if (this.$store.getters.systemLoggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('s/client/pending/', {
              params: {
                cntrl_no: this.id
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
                this.$router.push({ name: 'System-Client-Pending' })
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
