<template>

  <div>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="users"
    item-key="cntrl_no"
    show-select
    class="elevation-1"
    :loading="loading"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >

      <v-toolbar-title>Pending Table</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        @click="resend_verification"
        small
        :disabled="btn_disabled"
      >
        Resend Verification
      </v-btn>

      </v-toolbar>
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
  data () {
    return {
      users: [],
      multiLine: true,
      snackbar: false,
      snackbarText: '',
      singleSelect: false,
      loading: false,
      selected: [],
      cntrl_no: [],
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
    btn_disabled () {
      return this.selected.length === 0
    }
  },
  methods: {
    pending () {
      this.loading = true
      axios.get('u/email/pending', {
        params: {
          vli_subs_hdr: this.$store.getters.authenticatedUser.vli_subs_hdr
        }
      })
        .then(response => {
          this.loading = false
          this.users = response.data
        })
    },
    resend_verification () {
      Object.keys(this.selected).forEach(item => {
        this.cntrl_no.push(this.selected[item].cntrl_no)
      })
      this.user_verification_email()
    },
    user_verification_email () {
      axios.get('u/resend-verification-email-to-user', {
        params: {
          cntrl_no: this.cntrl_no
        }
      })
        .then(() => {
          this.snackbar = true
          this.snackbarText = 'Email Resent!'
          this.pending()
        })
    }
  },
  created () {
    this.pending()
  }
}
</script>
