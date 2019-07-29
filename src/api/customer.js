import request from '@utils/http'

export default {
  /**
   * 获取客户列表
   * @param args
   * @returns {*}
   */
  getCustomerList(args) {
    const url = ``
    return request.get({url, ...args})
  }
}
