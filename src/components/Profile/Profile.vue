<template>

  <div>

    <v-card
      width="600px"
      class="mx-auto"
    >

      <v-card-title>My Account</v-card-title>

      <v-divider></v-divider>

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
              <v-img :src="user.image_url" alt="avatar"/>

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

        <v-sheet
          color="white"
          rounded
          elevation="2"
          class="mx-auto"
        >
          <v-card-text>

            <v-row class="mt-2">

              <v-col>

                <v-text-field
                  v-model="user.username"
                  label="Username"
                  dense
                  outlined
                />

              </v-col>

            </v-row>

            <v-row class="mt-n2">

              <v-col>

                <v-text-field
                  v-model="user.email"
                  label="Email"
                  dense
                  outlined
                  readonly
                />

              </v-col>

            </v-row>

            <v-row class="mt-n2">

              <v-col>

                <v-text-field
                  v-model="user.mobile__"
                  label="Mobile Number"
                  dense
                  outlined
                  readonly
                />

              </v-col>

            </v-row>

            <v-card-actions>

              <v-row>

                <v-col class="text-right">

                  <v-btn class="primary" @click="update_profile()">

                    Save

                  </v-btn>

                </v-col>

              </v-row>

            </v-card-actions>

          </v-card-text>

        </v-sheet>

        <!-- <v-divider class="mt-8"></v-divider> -->

        <!-- <v-btn class="primary mt-5">

          Change Password

        </v-btn> -->

      </v-container>

    </v-card>

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

export default {
  name: 'Profile',
  components: {
    ImageInput: ImageInput
  },
  data () {
    return {
      avatar: null,
      saving: false,
      saved: false,
      multiLine: true,
      snackbar: false,
      snackbarText: '',
      form: {
        username: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      user: 'AUTHENTICATED_USER'
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
    savedAvatar () {
      this.saving = false
      this.saved = true
    },
    upload () {
      this.saving = true
      setTimeout(() => this.savedAvatar(), 1000)
      axios.post('u/settings/upload/avatar', this.avatar.formData)
        .then(() => {
          this.$root.$emit('newProfileImage', this.avatar.imageURL)
        })
    },
    update_profile () {
      axios.post('u/profile/username/update', {
        username: this.user.username
      })
        .then(() => {
          this.snackbar = true
          this.snackbarText = 'Successfully Updated!'
        })
    }
  }
}
</script>
