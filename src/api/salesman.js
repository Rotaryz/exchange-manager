import request from '@utils/http'

export default {
  // ---- 分销员列表 ----
  getSalesmanList(args) {
    const url = `/exchange-platform/platform/business/manager/index`
    return request.get({url, loading: false, ...args})
  },
  // ---- 分销员状态 ----
  getSalesmanStatus(args) {
    const url = `/exchange-platform/platform/meeting/meeting/statistic`
    return request.get({url, loading: false, ...args})
  },
  // ---- 删除分销员 ----
  salesmanDel(args) {
    const url = `/exchange-platform/platform/business/manager/destroy`
    return request.delete({url, loading: false, ...args})
  },
  // ---- 分销员详情 ----
  salesmanDetail(args) {
    const url = `/exchange-platform/platform/business/manager/show`
    return request.get({url, loading: false, ...args})
  },
  // ---- 新建分销员 ----
  salesmanNew(args) {
    const url = `/exchange-platform/platform/business/manager/create`
    return request.post({url, loading: false, ...args})
  },
  // ---- 编辑分销员 ----
  salesmanEdit(args) {
    const url = `/exchange-platform/platform/business/manager/update`
    return request.put({url, loading: false, ...args})
  },
}
