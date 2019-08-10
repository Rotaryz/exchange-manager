// import API from '@api'
// import app from '@src/main'
const INFO_STATUS = ''
export const state = {
  page: 1,
  orderList: [{}, {}],
  keyword: '',
  total: 21,
  status: INFO_STATUS
}

export const getters = {
  page: (state) => state.page,
  orderList: (state) => state.orderList,
  keyword: (state) => state.keyword,
  total: (state) => state.total,
  status: (state) => state.status
}

export const mutations = {
  SET_PAGE(state, page) {
    state.page = page
  },
  SET_CUSTOMER_LIST(state, orderList) {
    state.orderList = orderList
  },
  SET_KEYWORD(state, keyword) {
    state.keyword = keyword
  },
  SET_TOTAL(state, total) {
    state.total = total
  },
  SET_STATUS(state, status) {
    state.status = status
  }
}

export const actions = {
  /**
   * 初始化客户列表参数
   * @param state
   * @param commit
   */
  infoOrder({state, commit}) {
    commit('SET_PAGE', 1)
    commit('SET_KEYWORD', '')
    commit('SET_STATUS', INFO_STATUS)
  },
  /**
   * 获取客户列表
   * @param state
   * @param commit
   * @param loading
   */
  getOrderList({state, commit}, loading = false) {
    // let {page, keyword} = state
    // let data = {page, keyword}
    // return API.Order.getOrderList({data, loading, toast: true, doctor(){}})
    //   .then((res) => {
    //     if (res.error !== app.$ERR_OK) {
    //       app.$toast.show(res.message)
    //       return
    //     }
    //     commit('SET_CUSTOMER_LIST', list)
    //     commit('SET_TOTAL', res.meta.total)
    //     return list
    //   })
    //   .catch(() => {
    //     return false
    //   })
    //   .finally(() => {
    //     app.$loading.hide()
    //   })
    return true
  },
  /**
   * 获取更多客户列表
   * @param state
   * @param commit
   * @param obj
   */
  getMoreOrderList({state, commit, dispatch}, obj) {
    typeof (obj.page) !== 'undefined' && commit('SET_PAGE', obj.page)
    typeof (obj.keyword) !== 'undefined' && commit('SET_KEYWORD', obj.keyword)
    typeof (obj.status) !== 'undefined' && commit('SET_STATUS', obj.status)
    dispatch('getOrderList')
  }
}
