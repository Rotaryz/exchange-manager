import {mapGetters, mapActions} from 'vuex'

export const customerListComputed = {
  ...mapGetters('customerList', ['page', 'keyword', 'total', 'customerList'])
}
export const customerListMethods = {
  ...mapActions('customerList', ['infoCustomer', 'getCustomerList', 'getMoreCustomerList'])
}
