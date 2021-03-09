<template>

  <div>

  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="users"
    item-key="cntrl_no"
    class="elevation-1"
    :loading="loading"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >

      <v-toolbar-title>Verified Table</v-toolbar-title>

      </v-toolbar>
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
      singleSelect: false,
      loading: false,
      selected: [],
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'vli_empl_mst'
        },
        { text: 'Last Name', value: 'last_nme' },
        { text: 'First Name', value: 'frst_nme' },
        { text: 'Email', value: 'email' },
        { text: 'Mobile Number', value: 'mobile__' }

      ]
    }
  },
  methods: {
    verified () {
      this.loading = true
      axios.get('u/email/verified/', {
        params: {
          vli_subs_hdr: this.$store.getters.authenticatedUser.vli_subs_hdr
        }
      })
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
