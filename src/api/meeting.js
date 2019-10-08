import request from '@utils/http'

export default {
  // ---- 课程列表 ----
  getMeetingList(args) {
    const url = `/exchange-platform/platform/meeting/meeting/index`
    return request.get({url, loading: false, ...args})
  },
  // ---- 课程数量 ----
  getMeetingStatus(args) {
    const url = `/exchange-platform/platform/meeting/meeting/statistic`
    return request.get({url, loading: false, ...args})
  },
  // ---- 删除课程 ----
  meetingDel(args) {
    const url = `/exchange-platform/platform/meeting/meeting/destroy`
    return request.delete({url, loading: false, ...args})
  },
  // ---- 删除上下架 ----
  meetingUpDown(args) {
    const url = `/exchange-platform/platform/meeting/meeting/set-status`
    return request.get({url, loading: false, ...args})
  },
  // ---- 课程详情 ----
  meetingDetail(args) {
    const url = `/exchange-platform/platform/meeting/meeting/show`
    return request.get({url, loading: false, ...args})
  },
  // ---- 新建课程 ----
  meetingNew(args) {
    const url = `/exchange-platform/platform/meeting/meeting/create`
    return request.post({url, loading: false, ...args})
  },
  // ---- 编辑课程 ----
  meetingEdit(args) {
    const url = `/exchange-platform/platform/meeting/meeting/update`
    return request.put({url, loading: false, ...args})
  },
  // ---- 课程列表 ----
  getCourseList(args) {
    const url = `/exchange-platform/platform/course/course/index`
    return request.get({url, loading: false, ...args})
  },

}
