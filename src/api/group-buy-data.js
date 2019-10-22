import request from '@utils/http'

export default {
  // ---- 卖家排行榜列表 ----
  getSellersList(args) {
    const url = `/exchange-platform/platform/business-order/order/leaderboard`
    return request.get({url, loading: false, ...args})
  }
}
