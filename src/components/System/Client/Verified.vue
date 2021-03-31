<template>

  <div>

    <v-data-table
      :headers="headers"
      :items="list"
      :items-per-page="5"
      :loading="loading"
      :search="search"
      class="elevation-1"
    >

    <template v-slot:top>

      <v-card-title>

        Verified

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

      <template v-slot:item.action="{ item }">

        <v-btn
          :to="{ name: 'System-Client-Verified-Edit', params: { id: item.cntrl_no } }"
          icon
        >

          <v-icon>

            mdi-pencil-box-outline

          </v-icon>

        </v-btn>

      </template>

      <template v-slot:item.status__="{ item }">
        <v-edit-dialog>
          {{ fn_register_status(item.status__) }}
          <template v-slot:input>
            <v-select
              v-model="item.status__"
              :items="dt_register_status__"
              item-text="text"
              item-value="value"
              dense
              disabled
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>

    </v-data-table>

  </div>

</template>

<script>
import axios from 'axios'
import { registerStatus } from '@/mixins/build/registerStatus.js'

export default {
  mixins: [registerStatus],
  data () {
    return {
      loading: false,
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: true,
          value: 'cntrl_no'
        },
        { text: 'Company Name', value: 'co_name_', sortable: true },
        { text: 'First Name', value: 'frst_nme', sortable: true },
        { text: 'Last Name', value: 'last_nme', sortable: true },
        { text: 'Email', value: 'email', sortable: true },
        { text: 'Mobile', value: 'mobile__', sortable: true },
        { text: 'Action', value: 'action', sortable: false }
      ],
      list: []
    }
  },
  methods: {
    async clientList () {
      this.loading = true
      try {
        axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('s_t')
        if (this.$store.getters.systemLoggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('s/clients/verified')
              .then(response => {
                this.list = response.data
                this.loading = false
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    }
  },
  created () {
    this.clientList()
  }
}
</script>
