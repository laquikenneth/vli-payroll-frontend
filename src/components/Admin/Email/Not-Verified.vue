<template>

  <div>

  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="users"
    class="elevation-1"
    :loading="loading"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >

        <v-toolbar-title>Not Verified Table</v-toolbar-title>

        <v-spacer></v-spacer>

          <v-btn
            @click="send_verification_to_all"
            small
            :disabled="btn_disabled"
          >
            Send Verification To All
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
      loading: false,
      multiLine: true,
      snackbar: false,
      snackbarText: '',
      btn_disabled: true,
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
  watch: {
    users: function (item) {
      item.length === 0 ? this.btn_disabled = true : this.btn_disabled = false
    }
  },
  methods: {
    // note: not reactive
    not_verified () {
      this.loading = true
      axios.get('u/email/not-verified', {
        params: {
          vli_subs_hdr: this.$store.getters.authenticatedUser.vli_subs_hdr
        }
      })
        .then(response => {
          this.loading = false
          this.users = response.data
        })
    },
    send_verification_to_all () {
      axios.get('u/send-verification-email-to-user', {
      })
        .then(response => {
          this.snackbar = true
          this.snackbarText = 'Email Sent!'
          this.not_verified()
        })
    }
  },
  created () {
    this.not_verified()
  }
}
</script>
