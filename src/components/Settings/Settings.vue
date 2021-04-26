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

    <v-list-item  v-if="is_admin === 'T' && this.$route.name === 'Admin-Settings'">

      <v-list-item-content>

        <v-list-item-title>Change Company Logo</v-list-item-title>

          <v-container>

            <image-input v-model="avatar">

              <div slot="activator">

                <v-avatar
                  size="100px"
                  v-ripple
                  v-if="!avatar"
                  class="grey lighten-3 mb-3 ml-2"
                >

                  <!-- <span>Change Avatar</span> -->
                  <v-img :src="user.company_logo_url" alt="avatar"/>

                </v-avatar>

                <v-avatar
                  size="100px"
                  v-ripple
                  v-else
                  class="mb-3 ml-2"
                >
                  <v-img :src="avatar.imageURL" alt="avatar"/>

                </v-avatar>

              </div>

            </image-input>

            <v-slide-x-transition>

              <div
                v-if="avatar && saved == false"
                class="mt-2"
              >

                <v-btn
                  class="primary mb-3"
                  @click="upload()"
                  :loading="saving"
                >

                  Save Avatar

                </v-btn>

              </div>

            </v-slide-x-transition>
          </v-container>

      </v-list-item-content>

    </v-list-item>

      <!-- <v-container>

        <image-input v-model="avatar">

          <div slot="activator">

            <v-avatar
              size="150px"
              v-ripple
              v-if="!avatar"
              class="grey lighten-3 mb-3"
            >

              <v-img :src="user.image_url" alt="avatar" />

            </v-avatar>

            <v-avatar
              size="150px"
              v-ripple
              v-else
              class="mb-3"
            >
              <v-img :src="avatar.imageURL" alt="avatar" />

            </v-avatar>

          </div>

        </image-input>

        <v-slide-x-transition>

          <div v-if="avatar && saved == false">

            <v-btn
              class="primary"
              @click="upload()"
              :loading="saving"
            >

              Save Avatar

            </v-btn>

          </div>

        </v-slide-x-transition>

      </v-container> -->
      <!-- <v-form @submit.prevent="upload"> -->

      <!-- <input type="file" id="file" ref="file" @change="handleFileUpload()">

      <v-btn @click="upload()" type="submit">Upload</v-btn> -->

      <!-- </v-form> -->

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Password</v-list-item-title>
          <v-spacer/>
          <v-list-item-subtitle><span class="ml-3"><a @click="showDialog">Change password</a></span></v-list-item-subtitle>
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

    <!-- <v-list
      subheader
      two-line
      flat
    >
      <v-subheader>Admin</v-subheader>

    </v-list> -->
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
import ImageInput from '../Settings/components/ImageInput'
// import ImageInput from './components/ImageInput.vue'
// import { SkynetClient } from 'skynet-js'

// // Set a custom user agent.
// const customUserAgent = 'Sia-Agent'

// // Set an upload progress tracker.
// const onUploadProgress = (progress, { loaded, total }) => {
//   console.info(`Progress ${Math.round(progress * 100)}%`)
// }

// const client = new SkynetClient('https://siasky.net', { customUserAgent, onUploadProgress })

export default {
  name: 'Settings',
  components: {
    ImageInput: ImageInput
  },
  data () {
    return {
      settings: [],
      dialog: false,
      error: '',
      file: '',
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
      avatar: null,
      saving: false,
      saved: false,
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
      user: 'AUTHENTICATED_USER',
      is_admin: 'AUTHENTICATED_TYPE'
    })
  },
  watch: {
    avatar: {
      handler: function () {
        this.saved = false
      },
      deep: true
    }
  },
  methods: {
    uploadImage () {
      this.saving = true
      setTimeout(() => this.savedAvatar(), 1000)
    },
    savedAvatar () {
      this.saving = false
      this.saved = true
    },
    showDialog () {
      this.dialog = true
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },
    upload () {
      this.saving = true
      setTimeout(() => this.savedAvatar(), 1000)
      axios.post('u/settings/upload/company/avatar', this.avatar.formData)
        .then(() => {
          this.$root.$emit('newCompanyLogo', this.avatar.imageURL)
        })
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
  },
  created () {
    axios.defaults.headers.common.Authorization = null
  }
}
</script>
