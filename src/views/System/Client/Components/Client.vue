<template>

  <div>

    <Client :id="this.$route.params.id"></Client>

  </div>

</template>
<script>
import Client from '@/components/System/Client/Client.vue'

export default {
  name: 'Views-System-Client-Components-Client',
  components: {
    Client
  }
}
</script>
