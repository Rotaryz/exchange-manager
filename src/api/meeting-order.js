import request from '@utils/http'

export default {
  // ---- 订单列表 ----
  getOrderList(args) {
    const url = `/exchange-platform/platform/meeting-order/order/index`
    return request.get({url, loading: false, ...args})
  },
  // ---- 订单列表状态统计 ----
  getOrderStatistic(args) {
    const url = `/exchange-platform/platform/meeting-order/order/statistic`
    return request.get({url, loading: false, ...args})
  }
}
