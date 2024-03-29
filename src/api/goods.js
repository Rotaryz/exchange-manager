import request from '@utils/http'

export default {
  // ---- 商品列表 ----
  getGoodsList(args) {
    const url = `/exchange-platform/platform/platform-goods/goods/index`
    return request.get({url, ...args})
  },
  getGoodsListStatus(args) {
    const url = `/exchange-platform/platform/platform-goods/goods/statistic`
    return request.get({url, ...args})
  },
  getGoodsDetail(args) {
    const url = `/exchange-platform/platform/platform-goods/goods/show`
    return request.get({url, ...args})
  },
  editGoods(args) {
    const url = `/exchange-platform/platform/platform-goods/goods/update`
    return request.post({url, ...args})
  },
  addGoods(args) {
    const url = `/exchange-platform/platform/platform-goods/goods/create`
    return request.post({url, ...args})
  },
  deleteGoods(args) {
    const url = `/exchange-platform/platform/platform-goods/goods/destroy`
    return request.get({url, ...args})
  },
  editStatus(args) {
    const url = `/exchange-platform/platform/platform-goods/goods/set-status`
    return request.get({url, ...args})
  },
  // ---- 商品分类----
  getCategory(args) {
    const url = `/exchange-platform/platform/platform-goods/category/index`
    return request.get({url, ...args})
  },
  addCategory(args) {
    const url = `/exchange-platform/platform/platform-goods/category/create`
    return request.post({url, ...args})
  },
  deleteCategory(args) {
    const url = `/exchange-platform/platform/platform-goods/category/destroy`
    return request.post({url, ...args})
  },
  editCategory(args) {
    const url = `/exchange-platform/platform/platform-goods/category/update`
    return request.get({url, ...args})
  },
  // ---- 商品分組----
  getGroupList(args) {
    const url = `/exchange-platform/platform/platform-goods/group/index`
    return request.get({url, ...args})
  },
  getTradeList(args) {
    const url = `/exchange-platform/platform/industry/industry/index`
    return request.get({url, ...args})
  },
  getGroupDetail(args) {
    const url = `/exchange-platform/platform/platform-goods/group/group-goods-list`
    return request.get({url, ...args})
  },
  addGroup(args) {
    const url = `/exchange-platform/platform/platform-goods/group/create`
    return request.post({url, ...args})
  },
  editGroup(args) {
    const url = `/exchange-platform/platform/platform-goods/group/update`
    return request.post({url, ...args})
  },
  deleteGroup(args) {
    const url = `/exchange-platform/platform/platform-goods/group/destroy`
    return request.delete({url, ...args})
  },
  addGroupGoods(args) {
    const url = `/exchange-platform/platform/platform-goods/group/add-goods`
    return request.post({url, ...args})
  },
  deleteGroupGoods(args) {
    const url = `/exchange-platform/platform/platform-goods/group/delete-goods`
    return request.delete({url, ...args})
  },
  // 获取品牌列表
  getBrandList(args) {
    const url = `/exchange-platform/platform/platform-goods/brand/index`
    return request.get({url, ...args})
  }
}
