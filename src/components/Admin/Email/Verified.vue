<template>

  <div>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="users"
      :search="search"
      item-key="cntrl_no"
      class="elevation-1"
      :loading="loading"
    >

      <template v-slot:top>

        <v-card-title>

          Verified Employees

          <v-spacer></v-spacer>

          <v-col cols="6">

            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              outlined
              hide-details
              dense
            />

          </v-col>

        </v-card-title>

      </template>

    </v-data-table>

  </div>

</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      users: [],
      search: '',
      singleSelect: false,
      loading: false,
      selected: [],
      headers: [
        {
          text: 'Employee #',
          align: 'start',
          sortable: false,
          value: 'empl_cde'
        },
        { text: 'Last Name', value: 'last_nme' },
        { text: 'First Name', value: 'frst_nme' },
        { text: 'Email', value: 'email' },
        { text: 'Mobile Number', value: 'mobile__' },
        { text: 'Verified At', value: 'email_verified_at' }
      ]
    }
  },
  methods: {
    verified () {
      this.loading = true
      axios.get('u/email/verified')
        .then(response => {
          this.loading = false
          this.users = response.data
        })
    }
  },
  created () {
    this.verified()
  }
}
</script>
