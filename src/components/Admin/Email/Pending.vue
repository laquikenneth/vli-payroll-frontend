<template>

  <div>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="users"
      :search="search"
      item-key="cntrl_no"
      show-select
      class="elevation-1"
      :loading="loading"
    >

      <template v-slot:top>

        <v-card-title>

          Pending Verification

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

          <v-btn
            @click="show_dialog"
            :disabled="btn_disabled"
            medium
            class="ml-2"
          >

            Resend Verification

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

            <v-card-text>Resend verificaton email?</v-card-text>

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
              @click="resend_verification(), dialog = false"
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
      search: '',
      multiLine: true,
      snackbar: false,
      snackbarText: '',
      singleSelect: false,
      loading: false,
      dialog: false,
      selected: [],
      cntrl_no: [],
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
  computed: {
    btn_disabled () {
      return this.selected.length === 0
    }
  },
  methods: {
    pending () {
      this.loading = true
      axios.get('u/email/pending')
        .then(response => {
          this.loading = false
          this.users = response.data
        })
    },
    show_dialog () {
      this.dialog = true
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
          this.cntrl_no = []
          this.selected = []
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
