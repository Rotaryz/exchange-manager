import request from '@utils/http'

export default {
  // ---- 卖家排行榜列表 ----
  getSellersList(args) {
    const url = `/exchange-platform/platform/meeting-order/order/index`
    return request.get({url, loading: false, ...args})
  }
}
