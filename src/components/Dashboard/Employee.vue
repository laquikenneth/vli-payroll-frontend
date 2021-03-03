<template>

  <v-app>

    <!-- nav bar -->
    <v-navigation-drawer
      v-model="drawer"
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

            <v-list-item-title>{{ co_name_ }}</v-list-item-title>

            <v-list-item-subtitle>{{ co_sname }}</v-list-item-subtitle>

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
          color="indigo"
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

        <v-navigation-drawer
          v-model="drawer"
        >

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
                color="indigo"
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

                <v-list-item link>

                  <v-list-item-avatar>

                    <img :src="images.profile" alt="John">

                  </v-list-item-avatar>

                  <v-list-item-content>

                    <v-list-item-title>{{ user.frst_nme }} {{ user.last_nme }}</v-list-item-title>
                    <!-- <v-list-item-subtitle v-if="user_num == 0">{{ user_id_ }} - Admin</v-list-item-subtitle> -->
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

        </v-navigation-drawer>

      </template>

    </v-navigation-drawer>

    <v-app-bar app>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Dashboard</v-toolbar-title>

    </v-app-bar>

    <!-- <v-main> -->

      <v-container fluid>

        <router-view></router-view>

      </v-container>

    <!-- </v-main> -->

  </v-app>

</template>

<script>
export default {
  name: 'Employee-Dashboard',
  data () {
    return {
      user: '',
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
          action: 'mdi-history',
          title: 'Payroll History',
          active: true
        },
        {
          action: 'mdi-calendar-account-outline',
          title: 'DTR',
          active: true
        }

      ],
      account: [
        { text: 'Settings and admin', icon: 'mdi-cog-outline' }
      ]
    }
  },
  methods: {
    authenticatedUser () {
      this.$store.dispatch('authenticatedUser', 'System')
        .then(() => {
          this.user = this.$store.getters.authenticatedUser
        })
    },
    signout () {
      this.$store.dispatch('systemLogout')
        .then(() => {
          this.$router.push({ name: 'System-Signin' })
        })
    }
  },
  created () {
    this.authenticatedUser()
  }
}
</script>
