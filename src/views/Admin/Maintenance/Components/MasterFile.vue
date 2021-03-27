<template>

  <div>

    <AdminMasterFileEdit :id="this.$route.params.id"></AdminMasterFileEdit>

  </div>

</template>
<script>
import AdminMasterFileEdit from '@/components/Admin/Maintenance/Components/MasterFile.vue'

export default {
  name: 'View-Admin-MasterFile-Edit',
  components: {
    AdminMasterFileEdit
  }
}
</script>
