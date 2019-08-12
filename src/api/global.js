import request from '@utils/http'

export default {
  // 授权
  getToken(args) {
    const url = `/gateway/platform/manager/auth/post-login`
    return request.get({url, ...args})
  }
}
