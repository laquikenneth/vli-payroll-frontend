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

      <v-card-title>

        Not Verified

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
          @click="dialog = true"
          :disabled="btn_disabled"
          medium
          class="ml-2"
        >
          Send Verification Email
        </v-btn>

      </v-card-title>

    </template>

  </v-data-table>

  <!-- dialog message -->
  <v-row justify="center">

    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >

      <v-card>

        <v-card-title>Message</v-card-title>

          <v-card-text>Send an email verification to all. Proceed?</v-card-text>

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
            @click="send_verification_to_all(), dialog = false"
          >
            Yes
          </v-btn>

        </v-card-actions>

      </v-card>

    </v-dialog>

  </v-row>

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
      dialog: false,
      btn_disabled: true,
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
