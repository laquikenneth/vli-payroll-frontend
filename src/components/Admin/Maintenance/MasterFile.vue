<template>

  <div>

    <v-data-table
      :headers="headers"
      :items="masterfile"
      :search="search"
      :items-per-page="7"
      :loading="loading"
      class="elevation-1"
      height="400px"
    >

      <template v-slot:top>

        <v-card-title>
          <span>Master Files</span>

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

      <!-- <template v-slot:item.image_url="{ item }">

        <v-avatar
          size="40"
        >

          <v-img
            :src="item.image_url"
            lazy-src="https://vli.s3.filebase.com/static-image/default.jpg"
          />

        </v-avatar>

      </template> -->

      <template v-slot:item.action="{ item }">

        <v-btn
          icon
          :to="{ name: 'Admin-MasterFile-Edit', params: { id: item.cntrl_no } }"
        >

          <v-icon>

            mdi-eye-outline

          </v-icon>

        </v-btn>

      </template>

    </v-data-table>

  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Masterfile',
  data () {
    return {
      loading: false,
      search: '',
      headers: [
        {
          text: 'Employee Code',
          value: 'empl_cde',
          sortable: true
        },
        { text: 'Last Name', value: 'last_nme', sortable: true },
        { text: 'First Name', value: 'frst_nme', sortable: true },
        { text: 'Middle Name', value: 'midl_nme', sortable: true },
        { text: 'Email', value: 'email', sortable: true },
        { text: 'Mobile Number', value: 'mobile__' },
        { text: 'Action', value: 'action', sortable: false }
      ],
      masterfile: []
    }
  },
  methods: {
    async load_masterfile () {
      try {
        await new Promise((resolve, reject) => {
          this.loading = true
          axios.get('u/maintenance/masterfile')
            .then(response => {
              this.masterfile = response.data
              this.loading = false
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      } catch (error) {
      }
    }
  },
  created () {
    this.load_masterfile()
  }
}
</script>
