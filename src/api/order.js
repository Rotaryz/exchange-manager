import request from '@utils/http'

export default {
  /**
   * 获取订单列表
   * @param args
   * @returns {*}
   */
  getOrderList(args) {
    const url = `/gateway/platform/platform-order/sub-order/index`
    return request.get({url, ...args})
  },
  /**
   * 订单列表状态
   * @param args
   * @returns {*}
   */
  orderStatus(args) {
    const url = `/gateway/platform/platform-order/sub-order/statistic`
    return request.get({url, ...args})
  },
  /**
   * 发货详情
   * @param args
   * @returns {*}
   */
  logisticsDetail(args) {
    const url = `/gateway/platform/platform-order/sub-order/show-ship/`
    return request.get({url, ...args})
  },
  /**
   * 发货
   * @param args
   * @returns {*}
   */
  setLogistics(args) {
    const url = `/gateway/platform/platform-order/sub-order/ship`
    return request.post({url, ...args})
  }
}
