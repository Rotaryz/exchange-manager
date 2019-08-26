import request from '@utils/http'

export default {
  // 获取销售业务记录
  getSellList(args) {
    const url = `/exchange-platform/platform/payment/transaction/shop-level`
    return request.get({url, ...args})
  },
  // 获取采购订单记录
  getPurchaseList(args) {
    const url = `/exchange-platform/platform/payment/transaction/purchase`
    return request.get({url, ...args})
  },
  // 获取销售业务总额
  getSellTotal(args) {
    const url = `/exchange-platform/platform/payment/transaction/shop-level-total`
    return request.get({url, ...args})
  },
  // 获取采购订单总额
  getPurchaseTotal(args) {
    const url = `/exchange-platform/platform/payment/transaction/purchase-total`
    return request.get({url, ...args})
  },
  // 获取补贴记录
  getSubsidyList(args) {
    const url = `/exchange-platform/platform/settlement/settlement/index`
    return request.get({url, ...args})
  },
  // 获取补贴总金额
  getSubsidyTotal(args) {
    const url = `/exchange-platform/platform/settlement/settlement/account-total`
    return request.get({url, ...args})
  },
  // 提现列表
  getWithdrawalList(args) {
    const url = `/exchange-platform/platform/settlement/withdraw/index`
    return request.get({url, ...args})
  },
  // 提现状态统计
  getWithdrawalStatus(args) {
    const url = `/exchange-platform/platform/settlement/withdraw/statistic`
    return request.get({url, ...args})
  },
  // 提现详情
  getWithdrawalDetail(args) {
    const url = `/exchange-platform/platform/settlement/withdraw/show`
    return request.get({url, ...args})
  },
  // 审核提现
  withdrawCheckWithdraw(args) {
    const url = `/exchange-platform/platform/settlement/withdraw/check-withdraw`
    return request.get({url, ...args})
  },
  // 确认打款
  withdrawConfirmPay(args) {
    const url = `/exchange-platform/platform/settlement/withdraw/confirm-pay`
    return request.put({url, ...args})
  }
}
