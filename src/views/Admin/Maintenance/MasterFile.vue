<template>

  <div>

    <MasterFile :vli_subs_hdr="vli_subs_hdr"></MasterFile>

  </div>
</template>

<script>
import MasterFile from '@/components/Admin/Maintenance/MasterFile.vue'

export default {
  name: 'View-Admin-Masterfile',
  props: {
    vli_subs_hdr: Number
  },
  components: {
    MasterFile
  },
  data () {
    return {

    }
  }
}
</script>
