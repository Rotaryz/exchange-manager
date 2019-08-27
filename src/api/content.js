import request from '@utils/http'

export default {
  // 文章详情
  getArticleDetail(args) {
    const url = `/exchange-platform/platform/article/article/show`
    return request.get({url, ...args})
  },
  // 新建草稿
  addDraft(args) {
    const url = `/exchange-platform/platform/article/article/draft`
    return request.post({url, ...args})
  },
  // 编辑草稿
  editDraft(args) {
    const url = `/exchange-platform/platform/article/article/update-draft`
    return request.post({url, ...args})
  },
  // 新建文章上线
  addArticle(args) {
    const url = `/exchange-platform/platform/article/article/create`
    return request.post({url, ...args})
  },
  // 编辑文章上线
  editArticle(args) {
    const url = `/exchange-platform/platform/article/article/update-draft`
    return request.post({url, ...args})
  },
  // 获取上一篇文章的作者
  getAuth(args) {
    const url = `/exchange-platform/platform/article/article/get-last-author`
    return request.get({url, ...args})
  },
  getLikes(args) {
    const url = `/exchange-platform/platform/article/fabulou/index`
    return request.get({url, ...args})
  }

}
