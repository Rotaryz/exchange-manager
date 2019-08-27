import request from '@utils/http'

export default {
  /**
   * 保存模块数据
   * @param args
   * @returns {*}
   */
  saveModuleData(args) {
    const url = `/exchange-platform/platform/content/module/save-module-data`
    return request.post({url, ...args})
  },
  /**
   * 通过code获取页面详情
   * @param args
   * @returns {*}
   */
  moduleShow(args) {
    const url = `/exchange-platform/platform/content/module/page`
    return request.post({url, ...args})
  },
  /**
   * 获取商品列表
   * @param args
   * @returns {*}
   */
  goodsList(args) {
    const url = `/exchange-platform/platform/platform-goods/goods/index`
    return request.get({url, ...args})
  },
  /**
   * 分类列表
   * @param args
   * @returns {*}
   */
  categoryList(args) {
    const url = `/exchange-platform/platform/platform-goods/category/index`
    return request.get({url, ...args})
  },
  /**
   * 文章列表
   * @param args
   * @returns {*}
   */
  articleList(args) {
    const url = `/exchange-platform/platform/article/article/index`
    return request.get({url, ...args})
  },
  /**
   * 品牌列表
   * @param args
   * @returns {*}
   */
  brandList(args) {
    const url = `/exchange-platform/platform/platform-goods/brand/index`
    return request.get({url, ...args})
  },
  /**
   * 删除模块
   * @param args
   * @returns {*}
   */
  delDestroy(args) {
    const url = `/exchange-platform/platform/content/module/destroy`
    return request.delete({url, ...args})
  }
}
