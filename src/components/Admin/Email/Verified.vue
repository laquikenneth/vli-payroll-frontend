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

    </v-data-table>

  </div>

</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters({
      user: 'authenticatedUser'
    })
  },
  methods: {
    verified () {
      this.loading = true
      // axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('u_t')
      axios.get('u/email/verified', {
        params: {
          vli_subs_hdr: this.user.vli_subs_hdr
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
