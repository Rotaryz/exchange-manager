import request from '@utils/http'

export default {
  /**
   * 代理商列表
   * @param args
   * @returns {*}
   */
  getApplicationList(args) {
    const url = `/exchange-platform/platform/shop/shop-manager/index`
    return request.get({url, ...args})
  }
}
