import request from '@utils/http'

export default {
  /**
   * 获取订单列表
   * @param args
   * @returns {*}
   */
  getOrderList(args) {
    const url = ``
    return request.get({url, ...args})
  },
  /**
   * 订单列表状态
   * @param args
   * @returns {*}
   */
  orderStatus(args) {
    const url = ``
    return request.get({url, ...args})
  },
  /**
   * 发货详情
   * @param args
   * @returns {*}
   */
  logisticsDetail(id, args) {
    const url = `/${id}`
    return request.get({url, ...args})
  },
  /**
   * 发货
   * @param args
   * @returns {*}
   */
  setLogistics(id, args) {
    const url = `/${id}`
    return request.post({url, ...args})
  }
}
