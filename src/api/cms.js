import request from '@utils/http'

export default {
  /**
   * 获取客户列表
   * @param args
   * @returns {*}
   */
  goodsList(args) {
    const url = `/gateway/platform/platform-goods/goods/index`
    return request.get({url, ...args})
  },
  /**
   * 保存模块数据
   * @param args
   * @returns {*}
   */
  saveModuleData(args) {
    const url = `/gateway/platform/content/module/save-module-data`
    return request.post({url, ...args})
  },
  /**
   * 通过code获取页面详情
   * @param args
   * @returns {*}
   */
  moduleShow(args) {
    const url = `/gateway/platform/content/module/page`
    return request.post({url, ...args})
  },
  /**
   * 分类列表
   * @param args
   * @returns {*}
   */
  categoryList(args) {
    const url = `/gateway/platform/platform-goods/category/index`
    return request.get({url, ...args})
  },
  /**
   * 删除模块
   * @param args
   * @returns {*}
   */
  delDestroy(args) {
    const url = `/gateway/platform/content/module/destroy`
    return request.delete({url, ...args})
  }
}
