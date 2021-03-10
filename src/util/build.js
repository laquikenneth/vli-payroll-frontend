
// usage: v-data-table, v-simple-table
function build_email_status (value) {
  switch (value) {
    case '1':
      return 'Pending'
    case '2':
      return 'Verified'
    case '3':
      return 'Approved'
  }
}

export { build_email_status }
