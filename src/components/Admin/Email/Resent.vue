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

        <v-toolbar-title>Resend Table</v-toolbar-title>

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
      singleSelect: false,
      loading: false,
      multiLine: true,
      snackbar: false,
      snackbarText: '',
      selected: [],
      cntrl_no: [],
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'cntrl_no'
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
    resent () {
      this.loading = true
      axios.get('u/email/resent/', {
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
          this.resent()
        })
    }
  },
  created () {
    this.resent()
  }
}
</script>
