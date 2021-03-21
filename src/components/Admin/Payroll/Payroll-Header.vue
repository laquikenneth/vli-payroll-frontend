<template>

  <div>

    <v-data-table
      :headers="headers"
      :items="payroll"
      :items-per-page="5"
      :loading="loading"
      class="elevation-1"
    >
    </v-data-table>

  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Directory-Details',
  data () {
    return {
      loading: false,
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
        { text: 'Net Pay', value: 'net_pay_', sortable: true }
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
    }
  },
  created () {
    this.payroll_header()
  }
}
</script>
