import HTTP from '@utils/http'

export default {
  /**
   * 登录
   * @param args
   * @returns {*}
   */
  logIn(args) {
    const url = `/exchange-platform/platform/manager/auth/post-login`
    return HTTP.post({url, ...args})
  },
  /**
   * 验证token有效性
   * @returns {*}
   */
  validate(args) {
    let url = '/exchange-platform/platform/manager/auth/token-validate'
    return HTTP.get({url, ...args})
  }
}
