import request from '@utils/http'

export default {
  /**
   * 获取客户列表
   * @param args
   * @returns {*}
   */
  getCustomerList(args) {
    const url = `/gateway/platform/shop/shop-manager/index`
    return request.get({url, ...args})
  },
  /**
   * 获取客户等级
   * @param args
   * @returns {*}
   */
  getCustomerGrade(args) {
    const url = `/gateway/platform/shop/level/index`
    return request.get({url, ...args})
  },
  /**
   * 设置客户等级
   * @param args
   * @returns {*}
   */
  setCustomerGrade(args) {
    const url = `/gateway/platform/shop/shop-manager/set-level`
    return request.post({url, ...args})
  }
}
