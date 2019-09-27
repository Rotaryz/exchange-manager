import request from '@utils/http'

export default {
  // ---- 客户列表 ----
  getCustomerList(args) {
    const url = `/exchange-platform/platform/business-customer/customer/index`
    return request.get({url, loading: false, ...args})
  }
}
