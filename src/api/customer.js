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
  },
  /**
   * 获取客户等级
   * @param args
   * @returns {*}
   */
  getCustomerGrade(args) {
    const url = ``
    return request.get({url, ...args})
  },
  /**
   * 设置客户等级
   * @param args
   * @returns {*}
   */
  setCustomerGrade(id, args) {
    const url = `/${id}`
    return request.get({url, ...args})
  }
}
