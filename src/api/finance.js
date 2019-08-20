import request from '@utils/http'

export default {
  // ---- 提现列表 ----
  getWithdrawalList(args) {
    const url = `/exchange-platform/platform/platform-goods/goods/index`
    return request.get({url, ...args})
  },
  getWithdrawalStatus(args) {
    const url = `/exchange-platform/platform/platform-goods/goods/statistic`
    return request.get({url, ...args})
  },
  getWithdrawalDetail(args) {
    const url = `/exchange-platform/platform/platform-goods/goods/show`
    return request.get({url, ...args})
  }
}
