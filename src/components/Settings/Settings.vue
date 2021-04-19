<template>

  <div>
  <v-card
    class="mx-auto"
  >
    <v-toolbar
      elevation=1
    >

      <v-toolbar-title>Settings</v-toolbar-title>
    </v-toolbar>

    <v-list
      two-line
      subheader
    >
      <v-subheader>General</v-subheader>

      <v-form @submit.prevent="upload">

        <input type="file" @change="handleOnChange">

        <v-btn type="submit">Upload</v-btn>

      </v-form>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Password</v-list-item-title>
          <v-list-item-subtitle><span><a @click="showDialog">Change password</a></span></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Show your status</v-list-item-title>
          <v-list-item-subtitle>Your status is visible to everyone</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> -->
    </v-list>

    <v-divider></v-divider>

    <v-list
      subheader
      two-line
      flat
    >
      <v-subheader>Admin</v-subheader>

      <!-- <v-list-item-group
        v-model="settings"
        multiple
      > -->
        <!-- <v-list-item>
          <template v-slot:default="{ active, }">
            <v-list-item-action>
              <v-checkbox
                :input-value="active"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Allow notifications</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item> -->

        <!-- <v-list-item>
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox
                :input-value="active"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle>Hangouts message</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item> -->

        <!-- <v-list-item>
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox
                :input-value="active"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Video sounds</v-list-item-title>
              <v-list-item-subtitle>Hangouts video call</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item> -->

        <!-- <v-list-item>
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox
                :input-value="active"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Invites</v-list-item-title>
              <v-list-item-subtitle>Notify when receiving invites</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item> -->
      <!-- </v-list-item-group> -->
    </v-list>
  </v-card>

    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="400"
      >

        <v-card>
          <!-- <v-card-text> -->
            <v-card-title>Change Password</v-card-title>
            <v-container>
              <v-form
                ref="form"
                v-model="formHasErrors"
                lazy-validation
              >

                <!-- old password field -->
                <v-row>
                  <v-col>

                    <v-text-field
                      v-model="form.old_password"
                      :append-icon="show_old ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show_old ? 'text' : 'password'"
                      @click:append="show_old = !show_old"
                      :rules="rules.old_password"
                      dense
                      label="Enter your Old Password"
                      outlined
                      required
                      :error-messages="message_array"
                      @change="check_old_password()"
                    />
                    <!-- <template v-slot:message="{ key, message }">
                      <span v-html="key">{{ message }}</span>
                    </template> -->

                  </v-col>

                </v-row>

                <!-- new password field-->
                <v-row class="mt-n4">

                  <v-col>

                    <v-text-field
                      v-model="form.new_password"
                      :append-icon="show_new ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show_new ? 'text' : 'password'"
                      @click:append="show_new = !show_new"
                      dense
                      label="Enter New Password"
                      :rules="rules.new_password"
                      required
                      outlined
                      :error-messages="confirm_message"
                      :readonly="readonly"
                      :disabled="readonly"
                    />

                  </v-col>

                </v-row>

                <!-- verify new password field-->
                <v-row class="mt-n4">

                  <v-col>

                    <v-text-field
                      v-model="form.verify_new_password"
                      :append-icon="show_new ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show_new ? 'text' : 'password'"
                      @click:append="show_new = !show_new"
                      dense
                      label="Re-enter New Password"
                      required
                      outlined
                      :error-messages="confirm_message"
                      @change="passwordConfirmation()"
                      :readonly="readonly"
                      :disabled="readonly"
                    >

                    </v-text-field>

                  </v-col>

                </v-row>

              </v-form>
            </v-container>
          <!-- </v-card-text> -->

          <v-card-actions class="mt-n4">

            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="update_password()"
            >
              Update
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
import { mapGetters } from 'vuex'
import { SkynetClient } from 'skynet-js'
const client = new SkynetClient('https://siasky.net')

export default {
  data () {
    return {
      settings: [],
      dialog: false,
      error: '',
      image: '',
      message_array: [],
      confirm_message: [],
      multiLine: true,
      snackbar: false,
      snackbarText: '',
      rules: {
        required: value => !!value || 'Required.',
        old_password: [
          value => !!value || 'Old Password is required'
        ],
        new_password: [
          value => !!value || 'New Password is required'
        ],
        verify_new_password: [
          value => !!value || 'Password is required'
        ]

      },
      show_old: false,
      show_new: false,
      btn_disabled: false,
      formHasErrors: false,
      readonly: true,
      loading: false,
      hasError: false,
      form: {
        old_password: '',
        new_password: '',
        verify_new_password: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      user: 'AUTHENTICATED_USER'
    })
  },
  methods: {
    showDialog () {
      this.dialog = true
    },
    handleOnChange (e) {
      this.image = e.target.files[0]
    },
    async upload () {
      try {
        const { skylink } = await client.uploadFile(this.image)
        console.log(`Upload successful, skylink: ${skylink}`)
      } catch (error) {
        console.log(error)
      }
      // const formData = new FormData()
      // formData.set('image', this.image)
      // axios.post('u/settings/upload/avatar', formData)
    },
    check_old_password () {
      axios.post('u/admin/password-check', this.form)
        .then(() => {
          this.readonly = false
          this.hasError = false
          this.message_array = []
        })
        .catch(error => {
          this.readonly = true
          this.hasError = true
          this.message_array = error.response.data.message
        })
    },
    passwordConfirmation () {
      if (this.form.new_password !== this.form.verify_new_password) {
        this.confirm_message = ['Password not match.']
        this.hasError = true
      } else {
        this.confirm_message = []
        this.hasError = false
      }
    },
    update_password () {
      axios.post('u/admin/update-password', {
        verify_new_password: this.form.verify_new_password,
        user_id: this.user.vli_empl_mst
      })
        .then(() => {
          this.dialog = false
          this.snackbar = true
          this.snackbarText = 'Password updated successfully!'
          this.form = {}
        })
        .catch(error => {
          this.snackbar = true
          this.snackbarText = error.response.data.message
        })
    }
  }
}
</script>
