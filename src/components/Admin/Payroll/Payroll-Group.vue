<template>

  <div>

    <v-expansion-panels >

      <v-app-bar
        dense
        color="white"
        v-if="show_app_bar"
      >

        <v-app-bar-title>Payroll Group</v-app-bar-title>

      </v-app-bar>

      <v-expansion-panel v-for="group in group" :key="group.cntrl_no" multiple>

        <!-- <v-expansion-panel-header v-slot="{ open }" @click="retrieve_other_info(directory.cntrl_no)"> -->
        <v-expansion-panel-header v-slot="{ open }">
          <v-row>
            <v-col cols="12" md="4">
              ID: {{ group.cntrl_no }} ({{ group.payr_grp }})
            </v-col>
            <v-col
              cols="12"
            >
              <v-fade-transition leave-absolute>
                <span v-if="open">Description: {{ group.descript }}</span>
                <v-row
                  v-else
                  no-gutter
                >
                <v-col cols="4">
                    Description: {{ group.descript }}
                  </v-col>
                </v-row>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>

          <v-row>

            <v-col>

              <v-btn
                medium
                class="mr-2"
                :to="{ name: 'Admin-Payroll-Directory', params: { id: group.cntrl_no } }"
              >

                View

              </v-btn>

            </v-col>

          </v-row>

        </v-expansion-panel-content>

      </v-expansion-panel>

    </v-expansion-panels>

  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Admin-Directory',
  data () {
    return {
      directories: [],
      group: [],
      grosspay: '',
      deduction: '',
      netpay: '',
      total_employee: '',
      multiLine: true,
      snackbar: false,
      snackbarText: '',
      dialog: false,
      btn_disabled: false,
      show_app_bar: false
    }
  },
  methods: {
    payroll_group () {
      axios.get('u/payroll/group')
        .then(response => {
          this.group = response.data
          this.show_app_bar = true
        })
    }
  },
  created () {
    this.payroll_group()
  }
}
</script>
