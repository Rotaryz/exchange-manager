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
  // 编辑品牌
  editBrand(args) {
    const url = `/exchange-platform/platform/platform-goods/brand/update`
    return request.post({url, ...args})
  },
  // 行业列表
  getTradeList(args) {
    const url = `/exchange-platform/platform/industry/industry/index`
    return request.get({url, ...args})
  },
  // 品牌列表
  getBrandList(args) {
    const url = `/exchange-platform/platform/platform-goods/brand/index`
    return request.get({url, ...args})
  },
  // 品牌状态数
  getBrandListStatus(args) {
    const url = `/exchange-platform/platform/platform-goods/brand/statistic`
    return request.get({url, ...args})
  },
  // 品牌上下架
  switchStatus(args) {
    const url = `/exchange-platform/platform/platform-goods/brand/set-status`
    return request.post({url, ...args})
  },
  // 品牌上下架
  deleteBrand(args) {
    const url = `/exchange-platform/platform/platform-goods/brand/destroy`
    return request.post({url, ...args})
  },
  // 获取品牌下商品列表
  getGoodsList(args) {
    const url = `/exchange-platform/platform/platform-goods/goods/index`
    return request.post({url, ...args})
  },
  // 获取折扣
  getDiscount(args) {
    const url = `/exchange-platform/shop/shop/shop-level/index`
    return request.get({url, ...args})
  }


}
