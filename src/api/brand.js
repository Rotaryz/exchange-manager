import request from '@utils/http'

export default {
  // 品牌详情
  getBrandDetail(args) {
    const url = `/exchange-platform/platform/platform-goods/brand/show`
    return request.get({url, ...args})
  },
  // 创建品牌
  newBrand(args) {
    const url = `/exchange-platform/platform/platform-goods/brand/create`
    return request.post({url, ...args})
  },
  // 行业列表
  getTradeList(args) {
    const url = `/exchange-platform/platform/industry/industry/index`
    return request.get({url, ...args})
  },


}
