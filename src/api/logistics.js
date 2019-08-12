import request from '@utils/http'

/**
 * 物流api
 */
export default {
  /**
   * 获取订单列表
   * @param args
   * @returns {*}
   */
  logisticsList(args) {
    const url = `/gateway/platform/logistics/template/index`
    return request.get({url, ...args})
  },
}
