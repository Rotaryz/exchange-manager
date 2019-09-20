import request from '@utils/http'

/**
 * 物流api
 */
export default {
  /**
   * 获取物流列表
   * @param args
   * @returns {*}
   */
  logisticsList(args) {
    const url = `/exchange-platform/platform/logistics/template/index`
    return request.get({url, ...args})
  },
  /**
   * 获取默认物流
   * @param args
   * @returns {*}
   */
  getDefaultLogisticsInfo(){
    const url = `/exchange-platform/platform/logistics/template/get-default`
    return request.get({url})
  }
}
