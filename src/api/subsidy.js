import request from '@utils/http'

export default {
  /**
   * 获取补贴记录
   * @param args
   * @returns {*}
   */
  getSubsidyList(args) {
    const url = `/exchange-platform/platform/settlement/settlement/index`
    return request.get({url, ...args})
  },
  /**
   * 获取补贴总金额
   * @param args
   * @returns {*}
   */
  getSubsidyTotal(args) {
    const url = `/exchange-platform/platform/settlement/settlement/account-total`
    return request.get({url, ...args})
  }
}
