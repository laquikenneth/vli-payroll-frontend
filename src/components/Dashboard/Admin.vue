<template>

  <v-app>

    <!-- nav bar -->
    <v-navigation-drawer
      v-model="drawer"
      bottom
      app
    >

      <template v-slot:prepend>

        <v-skeleton-loader
          v-if="loading"
          type="list-item-avatar-two-line"
          class="py-1"
        />

        <v-list-item v-else two-line>

          <v-list-item-avatar>

            <img
              :src="user.company_logo_url"
            >

          </v-list-item-avatar>

          <v-list-item-content>

            <v-list-item-title>{{ user.co_name_ }}</v-list-item-title>

            <v-list-item-subtitle>{{ user.co_sname }}</v-list-item-subtitle>

          </v-list-item-content>

        </v-list-item>

      </template>

      <v-divider></v-divider>

      <!-- lists -->

      <v-list
        dense
        rounded
      >

        <!-- first list -->
        <v-list-item
          :to="{ name: 'Admin-Dashboard' }"
          link
        >

          <!-- icon -->
          <v-list-item-action>

            <v-icon>mdi-view-dashboard-outline</v-icon>

          </v-list-item-action>

          <!-- text -->
          <v-list-item-content>

            <v-list-item-title>Dashboard</v-list-item-title>

          </v-list-item-content>

        </v-list-item>

        <!-- ------------------------------------------------------ -->

        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >

          <!-- ---------------------------------------------------- -->

          <!-- item -->
          <template v-slot:activator>

            <v-list-item-content>

              <v-list-item-title v-text="item.title"></v-list-item-title>

            </v-list-item-content>

          </template>

          <!-- ---------------------------------------------------- -->

          <!-- sub item -->
          <v-list-item
            v-for="sub in item.subs"
            :key="sub.title"
            :to="sub.url"
            link
          >

            <v-list-item-icon>

            <v-icon v-text="sub.action"></v-icon>

            </v-list-item-icon>

            <v-list-item-title v-text="sub.title"></v-list-item-title>

          </v-list-item>

        <!-- ------------------------------------------------------ -->

        </v-list-group>

      </v-list>

      <!-- profile -->
      <template v-slot:append>

        <v-divider />

        <div class="px-3 py-3 d-flex">

          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            top
            offset-y
          >

            <template v-slot:activator="{ on }">

              <v-btn
                color="primary"
                dark
                v-on="on"
                small
                rounded
              >

                Account

              </v-btn>

            </template>

            <v-card>

              <v-system-bar
                dense
                height="10px"
              />

              <v-list dense>

                <v-list-item link :to="{ name: 'User-Profile', params: { username: user.username} }">

                  <v-list-item-avatar>

                    <v-img :src="user.image_url" alt="John" />

                  </v-list-item-avatar>

                  <v-list-item-content>

                    <v-list-item-title>{{ user.frst_nme }} {{ user.last_nme }}</v-list-item-title>
                    <v-list-item-subtitle >{{ user.email }}</v-list-item-subtitle>
                    <!-- <v-list-item-subtitle v-else>{{ user_id_ }}</v-list-item-subtitle> -->

                  </v-list-item-content>

                </v-list-item>

              </v-list>

              <v-divider />

              <v-list
                dense
                rounded
              >

                <v-list-item
                  v-for="(account, item) in account"
                  :key="item"
                  :to="account.url"
                  link
                >

                    <v-list-item-icon>

                      <v-icon v-text="account.icon"></v-icon>

                    </v-list-item-icon>

                    <v-list-item-content>

                      <v-list-item-title v-text="account.text"></v-list-item-title>

                    </v-list-item-content>

                </v-list-item>

                <v-list-item
                  @click="signout()"
                >
                  <v-list-item-icon>

                    <v-icon>mdi-logout-variant</v-icon>

                  </v-list-item-icon>

                  <v-list-item-content>

                    <v-list-item-title>Sign Out</v-list-item-title>

                  </v-list-item-content>

                </v-list-item>

              </v-list>

            </v-card>

          </v-menu>

          <v-spacer />

          <v-btn
            icon
            small

          >
            <v-icon>mdi-brightness-4</v-icon>
            <!-- <v-icon v-else>mdi-brightness-7</v-icon> -->

          </v-btn>

        </div>

      </template>

    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      elevation="1"
    >

      <v-app-bar-nav-icon @click="drawer = !drawer" class="white--text"></v-app-bar-nav-icon>

      <v-toolbar-title class="white--text">Dashboard</v-toolbar-title>

    </v-app-bar>

    <!-- <v-main> -->

      <v-container fluid>

        <router-view :vli_subs_hdr="user.vli_subs_hdr"></router-view>

      </v-container>

    <!-- </v-main> -->

  </v-app>

</template>

<script>
// import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'Admin-Dashboard',
  data () {
    return {
      drawer: null,
      menu: false,
      loading: false,
      username: 'Joan Visto',
      co_name_: 'Virtual Logic Inc.',
      co_sname: 'VLI',
      is_admin: 'F',
      images: {
        company: require('@/assets/discord.png'),
        profile: require('@/assets/discord.png')
      },
      items: [
        {
          action: 'mdi-account-cash-outline',
          title: 'Payroll',
          subs: [
            // {
            //   action: 'mdi-folder-outline',
            //   title: 'Directory',
            //   url: { name: 'Admin-Payroll-Directory' }
            // },
            {
              action: 'mdi-folder-outline',
              title: 'Directory',
              url: { name: 'Admin-Payroll-Group' }
            }
          ]

        },
        {
          action: 'mdi-account-group-outline',
          title: 'Maintainance',
          subs: [
            {
              action: 'mdi-folder-multiple-outline',
              title: 'Master File',
              url: { name: 'Admin-Masterfile' }

            }
          ]

        },
        {
          action: 'mdi-email-outline',
          title: 'Email',
          subs: [
            {
              action: 'mdi-account-alert-outline',
              title: 'Not Verified',
              url: { name: 'Admin-Email-Not-Verified' }
            },
            {
              action: 'mdi-account-clock-outline',
              title: 'Pending',
              url: { name: 'Admin-Email-Pending' }
            },
            // {
            //   action: 'mdi-account-arrow-right-outline',
            //   title: 'Resent',
            //   url: { name: 'Admin-Email-Resent' }
            // },
            {
              action: 'mdi-account-check-outline',
              title: 'Verified',
              url: { name: 'Admin-Email-Verified' }
            }
          ]

        },
        {
          action: 'mdi-cash-usd-outline',
          title: 'Subscription'
        }
      ],
      account: [
        { text: 'Settings', icon: 'mdi-cog-outline', url: { name: 'Admin-Settings' } },
        { text: 'Switch To Regular Payroll', icon: 'mdi-account-switch-outline', url: { name: 'Employee-Dashboard' } }
      ]
    }
  },
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      user: 'AUTHENTICATED_USER'
    })
  },
  mounted () {
    this.$store.dispatch('AUTH_USER', 'User')
    this.$store.dispatch('AUTH_TYPE')
      .then(response => {
        if (response.data === 'F') {
          this.$router.push({ name: 'Employee-Dashboard' })
        }
      })
    this.$root.$on('newProfileImage', (payload) => {
      this.user.image_url = payload
    })
    this.$root.$on('newCompanyLogo', (payload) => {
      this.user.company_logo_url = payload
    })
  },
  methods: {
    // authenticatedUser () {
    //   this.$store.dispatch('authenticatedUser', 'User')
    // },
    signout () {
      this.$store.dispatch('AUTH_USER_LOGOUT').then(() => {
        this.$router.push({ path: '/' })
        location.reload()
      })
    }
  },
  created () {
    // axios.get('u/type')
    //   .then(response => {
    //     this.is_admin = response.data
    //   })
    // if (this.is_admin !== 'F') {
    //   this.$router.push({ name: 'Employee-Dashboard' })
    // }
    // console.log(this.is_admin)
  }
}
</script>
