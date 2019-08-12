import request from '@utils/http'

export default {
  // ---- 商品列表 ----
  getGoodsList(args) {
    const url = `/api/goods/list.json`
    return request.get({url, ...args})
  },
  editGoods(args) {
    const url = `/api/goods/list.json`
    return request.get({url, ...args})
  },
  addGoods(args) {
    const url = `/api/goods/list.json`
    return request.get({url, ...args})
  },
  deleteGoods(args) {
    const url = `/api/goods/list.json`
    return request.get({url, ...args})
  },
  editStatus(args){
    const url = `/api/goods/list.json`
    return request.get({url, ...args})
  },
  // ---- 商品分类----
  getCategory(args) {
    const url = `/api/goods/category.json`
    return request.get({url, ...args})
  },
  // ---- 商品分組----
  getGroupList(args) {
    const url = `/api/goods/category.json`
    return request.get({url, ...args})
  },
  getGroupDetail(args){
    const url = `/api/goods/category.json`
    return request.get({url, ...args})
  },
  addGroup(args){
    const url = `/api/goods/category.json`
    return request.post({url, ...args})
  },
  editGroup(args){
    const url = `/api/goods/category.json`
    return request.post({url, ...args})
  },
  deleltGroup(args){
    const url = `/api/goods/category.json`
    return request.delete({url, ...args})
  },
  addGroupGoods(args){
    const url = `/api/goods/category.json`
    return request.post({url, ...args})
  },
  deleltGroupGoods(args){
    const url = `/api/goods/category.json`
    return request.delete({url, ...args})
  }
}
