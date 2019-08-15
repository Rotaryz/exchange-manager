import HTTP from '@utils/http'

export default {
  // 授权
  getToken(args) {
    const url = `/exchange-platform/platform/manager/auth/post-login`
    return HTTP.get({url, ...args})
  }
}
