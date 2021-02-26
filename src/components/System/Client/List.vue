
<template>

  <div>

    <v-data-table
      :headers="headers"
      :items="list"
      :items-per-page="5"
      :loading="loading"
      class="elevation-1"
    >

      <template v-slot:item.action="{ item }">

        <v-btn
          :to="{ name: 'System-Client-Edit', params: { id: item.cntrl_no } }"
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
      loading: false,
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
        { text: 'Status', value: 'status__', sortable: true },
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
            axios.get('s/clients')
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
