<template>

  <div>

    <PayrollDirectory :payr_dir="id"></PayrollDirectory>

  </div>

</template>

<script>
import PayrollDirectory from '@/components/Admin/Payroll/Directory.vue'

export default {
  name: 'View-Admin-Payroll-Directory',
  components: {
    PayrollDirectory
  },
  data () {
    return {
      id: this.$route.params.id
    }
  }
}
</script>
