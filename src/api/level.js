import request from '@utils/http'

export default {
  /**
   * 获取等级列表
   * @param args
   * @returns {*}
   */
  getLevelList(args) {
    const url = `/exchange-platform/platform/shop/level/index`
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
  },
  /**
   * 获取等级列表详情
   * @param args
   * @returns {*}
   */
  levelEdit(args) {
    const url = `/exchange-platform/platform/shop/level/show`
    return request.delete({url, ...args})
  },
  /**
   * 编辑等级列表
   * @param args
   * @returns {*}
   */
  levelPostEdit(args) {
    const url = `/exchange-platform/platform/shop/level/update`
    return request.post({url, ...args})
  }
}
