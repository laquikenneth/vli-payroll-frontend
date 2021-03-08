<template>

  <div>

    <v-expansion-panels >

      <v-expansion-panel v-for="directory in directories" :key="directory.cntrl_no" multiple>

        <v-expansion-panel-header v-slot="{ open }" @click="retrieve_other_info(directory.cntrl_no)">
          <v-row no-gutters>
            <v-col cols="4">
              ID: {{ directory.cntrl_no }} ({{ directory.payr_dir }} - Part  {{ directory.part____ }}) <span><v-icon color="teal">mdi-check</v-icon></span>
            </v-col>
            <v-col
              cols="8"
              class="text--secondary"
            >
              <v-fade-transition leave-absolute>
                <span v-if="open"></span>
                <v-row
                  v-else
                  no-gutter
                >
                  <v-col cols="4">
                    Start Date: {{ directory.strt_dte || 'Not set' }}
                  </v-col>
                  <v-col cols="4">
                    Last Date: {{ directory.last_dte || 'Not set' }}
                  </v-col>
                  <v-col cols="4">
                    Credit Date: {{ directory.credt_dt || 'Not set' }}
                  </v-col>
                </v-row>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="directory.strt_dte"
                label="Start Date"
                outlined
                dense
                readonly
              >

              </v-text-field>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="directory.last_dte"
                label="Last Date"
                outlined
                dense
                readonly
              >
              </v-text-field>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="directory.credt_dt"
                label="Credit Date"
                outlined
                dense
                readonly
              >
              </v-text-field>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="directory.remarks_"
                label="Remarks"
                outlined
                dense
                readonly
              >

              </v-text-field>
            </v-col>
          </v-row>

          <v-row>

            <v-col cols="3">

              <v-text-field
                v-model="grosspay"
                label="Total Gross Pay"
                outlined
                dense

              >

              </v-text-field>

            </v-col>

            <v-col cols="3">

              <v-text-field
                v-model="deduction"
                label="Total Deductions"
                outlined
                dense
                readonly
              >

              </v-text-field>

            </v-col>

            <v-col cols="3">

              <v-text-field
                v-model="netpay"
                label="Total Net Pay"
                outlined
                dense
                readonly
              >

              </v-text-field>

            </v-col>

            <v-col cols="3">

              <v-text-field
                v-model="total_employee"
                label="Number of Employees"
                outlined
                dense
                readonly
              >

              </v-text-field>

            </v-col>

          </v-row>

          <v-row class="mt-n5">

            <v-col>

              <v-btn
                medium
                class="mr-2"
              >

                View

              </v-btn>

              <v-btn
                @click="count_employees(directory.cntrl_no), dialog = true"
                medium
                :disabled="btn_disabled"
              >

                Send Payslip

              </v-btn>

            </v-col>

          </v-row>

          <v-row justify="center">

            <v-dialog
              v-model="dialog"
              persistent
              max-width="290"
            >

              <v-card>

                <v-card-title class="headline">Send Payslip?</v-card-title>

                  <v-card-text>You are about to send {{ total_employee }} payslip email(s). Proceed?</v-card-text>

                <v-card-actions>

                  <v-spacer></v-spacer>

                  <v-btn
                    color="green darken-1"
                    text
                    @click="dialog = false"
                  >
                    No
                  </v-btn>

                  <v-btn
                    color="green darken-1"
                    text
                    @click="send_payslip(directory.cntrl_no), dialog = false"
                  >
                    Yes
                  </v-btn>

                </v-card-actions>

              </v-card>

            </v-dialog>

          </v-row>

        </v-expansion-panel-content>

      </v-expansion-panel>

    </v-expansion-panels>

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
  name: 'Admin-Directory',
  data () {
    return {
      directories: [],
      grosspay: '',
      deduction: '',
      netpay: '',
      total_employee: '',
      multiLine: true,
      snackbar: false,
      snackbarText: '',
      dialog: false,
      btn_disabled: false
    }
  },
  methods: {
    payroll_directories () {
      axios.get('u/payroll/directories', {
        params: {
          vli_subs_hdr: this.$store.getters.authenticatedUser.vli_subs_hdr
        }
      })
        .then(response => {
          this.directories = response.data
        })
    },
    count_employees (id) {
      axios.get('u/payroll/directories/total-employee', {
        params: {
          vli_payr_dir: id
        }
      })
        .then(response => {
          this.total_employee = response.data
        })
    },
    send_payslip (id) {
      axios.get('u/payroll/payroll/header', {
        params: {
          vli_payr_dir: id
        }
      })
        .then(response => {
          this.snackbar = true
          this.snackbarText = 'Payslip has been sent.'
          this.btn_disabled = true
        })
    },
    retrieve_other_info (id) {
      this.compute_header_total_gross(id)
      this.compute_header_total_deduction(id)
      this.compute_header_total_net_pay(id)
      this.count_employees(id)
    },
    // vuex
    compute_header_total_gross (id) {
      axios.get('u/payroll/directories/total-gross-amount', {
        params: {
          vli_payr_dir: id
        }
      })
        .then(response => {
          this.grosspay = response.data
        })
    },
    compute_header_total_deduction (id) {
      axios.get('u/payroll/directories/total-deduction', {
        params: {
          vli_payr_dir: id
        }
      })
        .then(response => {
          this.deduction = response.data
        })
    },
    compute_header_total_net_pay (id) {
      axios.get('u/payroll/directories/total-net-pay', {
        params: {
          vli_payr_dir: id
        }
      })
        .then(response => {
          this.netpay = response.data
        })
    }
  },
  created () {
    this.payroll_directories()
  }
}
</script>
