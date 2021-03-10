export const registerStatus = {
  data () {
    return {
      dt_register_status__: [
        {
          value: '1',
          text: 'Pending'
        },
        {
          value: '2',
          text: 'Verified'
        },
        {
          value: '3',
          text: 'Approved'
        },
        {
          value: '4',
          text: 'Error'
        }
      ]
    }
  },
  methods: {
    fn_register_status (item) {
      switch (item) {
        case '1':
          return 'Pending'
        case '2':
          return 'Verified'
        case '3':
          return 'Approved'
        case '4':
          return 'Error'
      }
    }
  }
}
