<template>

  <div>

    <v-data-table
      :headers="headers"
      :items="masterfile"
      :search="search"
      :items-per-page="5"
      :loading="loading"
      class="elevation-1"
      height="400px"
    >

      <template v-slot:top>

        <v-card-title>

          <span>Master Files</span>

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

          <v-btn
            class="ml-2 mt-n1"
            elevation="1"
            medium
            v-show="hasErrors"
          >
            View Errors
          </v-btn>

        </v-card-title>

      </template>

      <template v-slot:item.action="{ item }">

        <v-btn
          @click="send_payslip(item)"
          icon
          :to="{ name: 'Admin-MasterFile-Edit', params: { id: item.empl_cde } }"
        >

          <v-icon>

            mdi-pencil-outline

          </v-icon>

        </v-btn>

      </template>

    </v-data-table>

  </div>

</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      loading: false,
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
        { text: 'Middle Name', value: 'midl_nme', sortable: true },
        { text: 'Action', value: 'action', sortable: false }
      ],
      masterfile: []
    }
  },
  methods: {
    load_masterfile () {
      this.loading = true
      axios.get('u/maintenance/masterfile', {
        params: {
          vli_subs_hdr: this.$store.getters.authenticatedUser.vli_subs_hdr
        }
      })
        .then(response => {
          this.masterfile = response.data
          this.loading = false
        })
    }

  },
  created () {
    this.load_masterfile()
  }
}
</script>
