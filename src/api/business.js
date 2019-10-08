import request from '@utils/http'

export default {
  // ---- 角色权限列表 ----
  getRoleList(args) {
    const url = `/exchange-platform/platform/business/manager/role-list`
    return request.get({url, loading: false, ...args})
  },
  // ---- 账号列表 ----
  getAccountList(args) {
    const url = `/exchange-platform/platform/business/manager/index`
    return request.get({url, loading: false, ...args})
  },
  // ---- 新建账号 ----
  createAccount(args) {
    const url = `/exchange-platform/platform/business/manager/create`
    return request.get({url, loading: false, ...args})
  },
  // ---- 编辑账号 ----
  editAccount(args) {
    const url = `/exchange-platform/platform/business/manager/update`
    return request.get({url, loading: false, ...args})
  },
  // ---- 删除账号 ----
  deleteAccount(args) {
    const url = `/exchange-platform/platform/business/manager/destroy`
    return request.get({url, loading: false, ...args})
  },
  // ---- 账号详情 ----
  getAccountInfo(args) {
    const url = `/exchange-platform/platform/business/manager/show`
    return request.get({url, loading: false, ...args})
  }
}
