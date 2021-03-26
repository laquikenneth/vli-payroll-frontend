<template>

  <div>

    <v-data-table
      :headers="headers"
      :items="payroll"
      :search="search"
      :items-per-page="5"
      :loading="loading"
      class="elevation-1"
      height="400px"
    >

      <template v-slot:top>

        <v-card-title>

          <span>Payroll Headers #{{ payroll[0].vli_payr_dir }}</span>

          <v-spacer></v-spacer>

          <v-cols cols="6">

            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              outlined
              hide-details
              dense
            />

          </v-cols>

        </v-card-title>

      </template>

      <template v-slot:item.action="{ item }">

        <v-btn
          @click="send_payslip(item)"
          icon
        >

          <v-icon>

            mdi-email-send-outline

          </v-icon>

        </v-btn>

      </template>

    </v-data-table>

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
  name: 'Directory-Details',
  data () {
    return {
      loading: false,
      show_app_bar: true,
      multiLine: true,
      snackbar: false,
      hasErrors: false,
      snackbarText: '',
      search: '',
      headers: [
        {
          text: 'Employee #',
          align: 'left',
          sortable: true,
          value: 'empl_cde'
        },
        { text: 'Last Name', value: 'last_nme', sortable: true },
        { text: 'First Name', value: 'frst_nme', sortable: true },
        { text: 'Gross Pay', value: 'grosspay', sortable: true },
        { text: 'Deduction', value: 'deductn_', sortable: true },
        { text: 'Net Pay', value: 'net_pay_', sortable: true },
        { text: 'Action', value: 'action', sortable: false }
      ],
      payroll: []
    }
  },
  methods: {
    payroll_header () {
      this.loading = true
      axios.get('u/payroll/header', {
        params: {
          vli_payr_dir: this.$route.params.id
        }
      })
        .then(reponse => {
          this.payroll = reponse.data
          this.loading = false
        })
    },
    send_payslip (item) {
      axios.get('u/payroll/send/payslip/employee', {
        params: {
          vli_empl_mst: item.vli_empl_mst,
          vli_payr_dir: this.$route.params.id
        }
      })
        .then(() => {
          this.snackbar = true
          this.snackbarText = 'Payslip has been sent.'
          this.btn_disabled = true
        })
    }
  },
  created () {
    this.payroll_header()
  }
}
</script>
