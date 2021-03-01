<template>

  <div>

    <ClientApproved :id="this.$route.params.id"></ClientApproved>

  </div>

</template>
<script>
import ClientApproved from '@/components/System/Client/Components/Approved.vue'

export default {
  name: 'Views-System-Client-Components-Approved',
  components: {
    ClientApproved
  }
}
</script>
