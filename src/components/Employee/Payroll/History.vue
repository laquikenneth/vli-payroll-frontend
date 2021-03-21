<template>

  <div>

    <v-expansion-panels >

      <v-expansion-panel v-for="header in headers" :key="header.vli_payr_dir" multiple>

        <v-expansion-panel-header v-slot="{ open }" @click="retrieve_other_info(header.vli_payr_dir)">
          <v-row no-gutters>
            <v-col cols="4">
              ID: {{ header.payr_dir }} (Part  {{ header.part____ }}) <span><v-icon color="teal">mdi-check</v-icon></span>
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
                    Start Date: {{ header.strt_dte || 'Not set' }}
                  </v-col>
                  <v-col cols="4">
                    Last Date: {{ header.last_dte || 'Not set' }}
                  </v-col>
                  <v-col cols="4">
                    Credit Date: {{ header.credt_dt || 'Not set' }}
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
                v-model="header.strt_dte"
                label="Start Date"
                outlined
                dense
                readonly
              >

              </v-text-field>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="header.last_dte"
                label="Last Date"
                outlined
                dense
                readonly
              >
              </v-text-field>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="header.credt_dt"
                label="Credit Date"
                outlined
                dense
                readonly
              >
              </v-text-field>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="header.remarks_"
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
                v-model="header.grosspay"
                label="Total Gross Pay"
                outlined
                dense
                readonly
                @click="grosspay_details(header.cntrl_no)"
              >

              </v-text-field>

            </v-col>

            <v-col cols="3">

              <v-text-field
                v-model="header.deductn_"
                label="Total Deductions"
                outlined
                dense
                readonly
                @click="deduction_details(header.cntrl_no)"
              >

              </v-text-field>

            </v-col>

            <v-col cols="3">

              <v-text-field
                v-model="header.net_pay_"
                label="Total Net Pay"
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
                small
                class="mr-2"
                @click="download_payslip"
                :disabled="btn_disabled"
              >

                Download Payslipd

              </v-btn>
<!--
              <v-btn
                @click="count_employees(header.vli_payr_dir), dialog = true"
                medium
                :disabled="btn_disabled"
              >

                Send Payslip

              </v-btn> -->

            </v-col>

          </v-row>

        </v-expansion-panel-content>

      </v-expansion-panel>

    </v-expansion-panels>

    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>

        <v-card-title class="headline">
          {{ dialog_title }}
        </v-card-title>

        <!-- <v-row>
          <v-col> -->
            <v-card-text v-for="grosspay in grosspay" :key="grosspay.vli_empl_mst">
              <v-row class="descript-right">
                <v-col cols="5">
                  {{ grosspay.descript }}:
                </v-col>
                <v-col cols="3">
                  {{ grosspay.amount__ }}
                </v-col>
              </v-row>
            </v-card-text>
          <!-- </v-col>
        </v-row> -->

        <!-- <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-row>

  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Employee-Payroll-History',
  data () {
    return {
      user: '',
      headers: [],
      grosspay: '',
      deduction: '',
      netpay: '',
      total_employee: '',
      dialog_title: '',
      multiLine: true,
      snackbar: false,
      snackbarText: '',
      dialog: false,
      btn_disabled: false
    }
  },
  methods: {
    payroll_header () {
      axios.get('u/employee/payroll/history', {
        params: {
          vli_empl_mst: this.$store.getters.authenticatedUser.vli_empl_mst
        }
      })
        .then(response => {
          this.headers = response.data
        })
    },
    grosspay_details (id) {
      axios.get('u/employee/payroll/history/gross/details', {
        params: {
          vli_payr_dir: id,
          vli_empl_mst: this.$store.getters.authenticatedUser.vli_empl_mst
        }
      })
        .then(response => {
          this.grosspay = response.data
          this.dialog_title = 'Gross Pay Details'
          this.dialog = true
        })
    },
    deduction_details (id) {
      axios.get('u/employee/payroll/history/deduction/details', {
        params: {
          vli_payr_dir: id,
          vli_empl_mst: this.$store.getters.authenticatedUser.vli_empl_mst
        }
      })
        .then(response => {
          this.grosspay = response.data
          this.dialog_title = 'Deduction Details'
          this.dialog = true
        })
    },
    netpay_details (id) {
      axios.get('u/employee/payroll/history/netpay/details', {
        params: {
          vli_payr_dir: id,
          vli_empl_mst: this.$store.getters.authenticatedUser.vli_empl_mst
        }
      })
        .then(response => {
          this.grosspay = response.data
          this.dialog_title = 'Net Pay Details'
          this.dialog = true
        })
    },
    download_payslip () {
      this.btn_disabled = true
      axios({
        url: 'u/employee/payroll/payslip/download',
        method: 'GET',
        responseType: 'blob'
      })
        .then(response => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]))
          var fileLink = document.createElement('a')

          fileLink.href = fileURL
          fileLink.setAttribute('download', this.user.frst_nme + ' ' + this.user.last_nme + '.pdf')
          document.body.appendChild(fileLink)

          fileLink.click()
          this.btn_disabled = false
        })
    }
  },
  created () {
    this.payroll_header()
    this.user = this.$store.getters.authenticatedUser
  }
}
</script>
<style>
  @font-face {
  font-family: 'Courier New';
  src: url(/fonts/cour.ttf) format("TrueType");
}

.descript-right {
  text-align: right;
}

</style>
