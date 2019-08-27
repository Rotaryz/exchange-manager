import request from '@utils/http'

export default {
  /**
   * 获取订单列表
   * @param args
   * @returns {*}
   */
  getOrderList(args) {
    const url = `/exchange-platform/platform/platform-order/sub-order/index`
    return request.get({url, ...args})
  },
  /**
   * 订单列表状态
   * @param args
   * @returns {*}
   */
  orderStatus(args) {
    const url = `/exchange-platform/platform/platform-order/sub-order/statistic`
    return request.get({url, ...args})
  },
  /**
   * 发货详情
   * @param args
   * @returns {*}
   */
  logisticsDetail(args) {
    const url = `/exchange-platform/platform/platform-order/sub-order/show-ship/`
    return request.get({url, ...args})
  },
  /**
   * 发货
   * @param args
   * @returns {*}
   */
  setLogistics(args) {
    const url = `/exchange-platform/platform/platform-order/sub-order/ship`
    return request.post({url, ...args})
  },
  /**
   * 优品订单列表
   * @param args
   * @returns {*}
   */
  getBeanList(args) {
    const url = `/exchange-platform/platform/bean-order/order/index`
    return request.post({url, ...args})
  },
  /**
   * 优品发货详情
   * @param args
   * @returns {*}
   */
  logisticsExDetail(args) {
    const url = `/exchange-platform/platform/bean-order/order/index`
    return request.post({url, ...args})
  },
  /**
   * 订单发货
   * @param args
   * @returns {*}
   */
  setExLogistics(args) {
    const url = `/exchange-platform/platform/bean-order/order/ship`
    return request.post({url, ...args})
  },
  /**
   * 订单列表状态
   * @param args
   * @returns {*}
   */
  exchangeStatus(args) {
    const url = `/exchange-platform/platform/bean-order/order/statistic`
    return request.get({url, ...args})
  },
}
