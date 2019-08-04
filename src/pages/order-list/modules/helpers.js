import {mapGetters, mapActions} from 'vuex'

export const orderListComputed = {
  ...mapGetters('orderList', ['page', 'keyword', 'total', 'orderList', 'status']),
}
export const orderListMethods = {
  ...mapActions('orderList', ['infoOrder', 'getOrderList', 'getMoreOrderList']),
}
