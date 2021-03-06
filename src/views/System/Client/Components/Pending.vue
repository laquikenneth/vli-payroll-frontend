<template>

  <div>

    <ClientPending :id="this.$route.params.id"></ClientPending>

  </div>

</template>
<script>
import ClientPending from '@/components/System/Client/Components/Pending.vue'

export default {
  name: 'Views-System-Client-Components-Pending',
  components: {
    ClientPending
  }
}
</script>
