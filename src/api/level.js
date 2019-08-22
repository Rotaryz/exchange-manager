import request from '@utils/http'

export default {
  /**
   * 获取等级列表
   * @param args
   * @returns {*}
   */
  getLevelList(args) {
    const url = `/exchange-platform/platform/shop/shop-manager/index`
    return request.get({url, ...args})
  },
  /**
   * 获取等级列表
   * @param args
   * @returns {*}
   */
  delLevel(args) {
    const url = `/exchange-platform/platform/shop/shop-manager/index`
    return request.delete({url, ...args})
  }
}
