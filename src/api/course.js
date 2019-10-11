import request from '@utils/http'

export default {
  // ---- 课程列表 ----
  getCourseList(args) {
    const url = `/exchange-platform/platform/course/course/index`
    return request.get({url, loading: false, ...args})
  },
  // ---- 课程数量 ----
  getCourseStatus(args) {
    const url = `/exchange-platform/platform/course/course/statistic`
    return request.get({url, loading: false, ...args})
  },
  // ---- 删除课程 ----
  courseDel(args) {
    const url = `/exchange-platform/platform/course/course/destroy`
    return request.delete({url, loading: false, ...args})
  },
  // ---- 删除上下架 ----
  courseUpDown(args) {
    const url = `/exchange-platform/platform/course/course/set-status`
    return request.get({url, loading: false, ...args})
  },
  // ---- 课程详情 ----
  courseDetail(args) {
    const url = `/exchange-platform/platform/course/course/show`
    return request.get({url, loading: false, ...args})
  },
  // ---- 新建课程 ----
  courseNew(args) {
    const url = `/exchange-platform/platform/course/course/create`
    return request.post({url, loading: false, ...args})
  },
  // ---- 编辑课程 ----
  courseEdit(args) {
    const url = `/exchange-platform/platform/course/course/update`
    return request.put({url, loading: false, ...args})
  },

}
