import request from '@utils/http'

export default {
  /**
   * 获取客户列表
   * @param args
   * @returns {*}
   */
  getCustomerList(args) {
    const url = `/exchange-platform/platform/shop/shop-manager/index`
    return request.get({url, ...args})
  },
  /**
   * 获取客户等级
   * @param args
   * @returns {*}
   */
  getCustomerGrade(args) {
    const url = `/exchange-platform/platform/shop/level/index`
    return request.get({url, ...args})
  },
  /**
   * 设置客户等级
   * @param args
   * @returns {*}
   */
  setCustomerGrade(args) {
    const url = `/exchange-platform/platform/shop/shop-manager/set-level`
    return request.post({url, ...args})
  },
  /**
   * 交易记录
   * @param args
   * @returns {*}
   */
  // todo ammy
  getTradingRecord(args) {
    const url = `/exchange-platform/platform/shop/level-right-order/index`
    return request.get({url, ...args})
  },
  /**
   * 客户详情[1.3]
   * @param args
   * @returns {*}
   */
  // todo ammy
  getSettingDetail(args) {
    const url = `/exchange-platform/platform/shop/shop-manager/show`
    return request.get({url, ...args})
  },
  /**
   * 等级权限详情[1.3]
   * @param args
   * @returns {*}
   */
  // todo ammy
  getLevelDetail(args) {
    const url = `/exchange-platform/platform/shop/level/show`
    return request.get({url, ...args})
  },
  /**
   * 等级权限详情[1.3]
   * @param args
   * @returns {*}
   */
  // todo ammy
  editSettingDetail(args) {
    const url = `/exchange-platform/platform/shop/shop-manager/set-level`
    return request.post({url, ...args})
  }
}
