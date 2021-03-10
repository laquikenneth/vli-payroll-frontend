<template>

  <div>

    <Error :id="this.$route.params.id"></Error>

  </div>

</template>
<script>
import Error from '@/components/System/Client/Components/Client-Error.vue'

export default {
  name: 'Views-System-Client-Components-Error',
  components: {
    Error
  }
}
</script>
