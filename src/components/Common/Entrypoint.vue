<template>

  <div>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EntryPoint',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      user: 'authenticatedUser'
    })
  },
  methods: {
    dashboard () {
      if (this.user.is_admin === 'T') {
        this.$router.push({ name: 'Admin-Dashboard' })
      } else {
        this.$router.push({ name: 'Employee-Dashboard' })
      }
    }
  },
  created () {
    setTimeout(() => {
      this.dashboard()
    }, 3000)
  }
}
</script>
