import request from '@utils/http'

export default {
  /**
   * 获取销售业务记录
   * @param args
   * @returns {*}
   */
  getSellList(args) {
    const url = `/exchange-platform/platform/payment/transaction/shop-level`
    return request.get({url, ...args})
  },
  /**
   * 获取采购订单记录
   * @param args
   * @returns {*}
   */
  getPurchaseList(args) {
    const url = `/exchange-platform/platform/payment/transaction/purchase`
    return request.get({url, ...args})
  },
  /**
   * 获取销售业务总额
   * @param args
   * @returns {*}
   */
  getSellTotal(args) {
    const url = `/exchange-platform/platform/payment/transaction/shop-level-total`
    return request.get({url, ...args})
  },
  /**
   * 获取采购订单总额
   * @param args
   * @returns {*}
   */
  getPurchaseTotal(args) {
    const url = `/exchange-platform/platform/payment/transaction/purchase-total`
    return request.get({url, ...args})
  }
}
