<template>

  <div>

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

            <img :src="images.company">

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
        rounded
        dense
      >

        <!-- first list -->
        <v-list-item
          :to="{ name: 'Employee-Dashboard' }"
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

        <!-- <v-navigation-drawer
          v-model="drawer"
        > -->

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

                <v-list-item link :to="{ name: 'Employee-Profile', params: { username: user.username} }">

                  <v-list-item-avatar>

                    <img :src="user.image_url" alt="John">

                    <!-- <img :src="" -->

                  </v-list-item-avatar>

                  <v-list-item-content>

                    <v-list-item-title>{{ user.frst_nme }} {{ user.last_nme }}</v-list-item-title>
                    <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
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
                  v-if="user.is_admin === 'T'"
                  :to="{ name: 'Admin-Dashboard' }"
                >
                  <v-list-item-icon>

                    <v-icon>mdi-account-switch-outline</v-icon>

                  </v-list-item-icon>

                  <v-list-item-content>

                    <v-list-item-title>Switch To Admin Panel</v-list-item-title>

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

        <!-- </v-navigation-drawer> -->

      </template>

    </v-navigation-drawer>

    <v-app-bar app color="primary">

      <v-app-bar-nav-icon @click="drawer = !drawer" class="white--text"></v-app-bar-nav-icon>

      <v-toolbar-title class="white--text">Dashboard</v-toolbar-title>

    </v-app-bar>

    <!-- <v-main> -->

      <v-container fluid>

        <router-view></router-view>

      </v-container>

    <!-- </v-main> -->

  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Employee-Dashboard',
  data () {
    return {
      drawer: null,
      menu: false,
      loading: false,
      username: 'Joan Visto',
      co_name_: 'Virtual Logic Inc.',
      co_sname: 'VLI',
      images: {
        company: require('@/assets/discord.png'),
        profile: require('@/assets/discord.png')
      },
      items: [
        {
          action: 'mdi-account-cash-outline',
          title: 'Payroll',
          active: true,
          subs: [
            {
              action: 'mdi-folder-outline',
              title: 'History',
              url: { name: 'Employee-Payroll-History' }
            }
          ]
        },
        {
          action: 'mdi-calendar-account-outline',
          title: 'DTR'
        },
        {
          action: 'mdi-cash-usd-outline',
          title: 'Loans'
        },
        {
          action: 'mdi-calendar-weekend-outline',
          title: 'Leaves'
        }

      ],
      account: [
        { text: 'Settings', icon: 'mdi-cog-outline', url: { name: 'User-Settings' } }
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'AUTHENTICATED_USER'
    })
  },
  mounted () {
    this.$store.dispatch('AUTH_USER', 'User')
    if (this.user.is_admin === 'T') {
      this.$router.push({ name: 'Admin-Dashboard' })
    }
    this.$root.$on('newProfileImage', (payload) => {
      this.user.image_url = payload
    })
  },
  methods: {
    signout () {
      this.$store.dispatch('AUTH_USER_LOGOUT').then(() => {
        this.$router.push({ path: '/' })
        location.reload()
      })
    }
  },
  created () {
  }
}
</script>
