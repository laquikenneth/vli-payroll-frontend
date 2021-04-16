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

        Pending

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

      <template v-slot:item.action="{ item }">

        <v-btn
          :to="{ name: 'System-Client-Pending-Edit', params: { id: item.cntrl_no } }"
          icon
        >

          <v-icon>

            mdi-pencil-box-outline

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
      search: '',
      loading: false,
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: true,
          value: 'cntrl_no'
        },
        { text: 'First Name', value: 'frst_nme', sortable: true },
        { text: 'Last Name', value: 'last_nme', sortable: true },
        { text: 'Email', value: 'email', sortable: true }
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
            axios.get('s/clients/pending')
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
