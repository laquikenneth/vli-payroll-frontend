<template>

  <div>

    <clientList></clientList>

    <!-- <v-row class="mt-1">

      <v-col
        align="center"
        justify="center"
      >

        <a>

          <h5 class="font-weight-regular grey--text">Forgot your password?</h5>

        </a>

      </v-col>

    </v-row> -->

  </div>

</template>
<script>
import clientList from '@/components/System/Client/List.vue'

export default {
  name: 'View-System-Client-List',
  components: {
    clientList
  }
}
</script>
