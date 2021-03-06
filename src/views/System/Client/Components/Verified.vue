<template>

  <div>

    <ClientVerified :id="this.$route.params.id"></ClientVerified>

  </div>

</template>
<script>
import ClientVerified from '@/components/System/Client/Components/Verified.vue'

export default {
  name: 'Views-System-Client-Components-Verified',
  components: {
    ClientVerified
  }
}
</script>
