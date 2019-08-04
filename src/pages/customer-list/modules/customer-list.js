// import API from '@api'
// import app from '@src/main'
export const state = {
  page: 1,
  customerList: [{}],
  keyword: '',
  total: 0
}

export const getters = {
  page: (state) => state.page,
  customerList: (state) => state.customerList,
  keyword: (state) => state.keyword,
  total: (state) => state.total
}

export const mutations = {
  SET_PAGE(state, page) {
    state.page = page
  },
  SET_CUSTOMER_LIST(state, customerList) {
    state.customerList = customerList
  },
  SET_KEYWORD(state, keyword) {
    state.keyword = keyword
  },
  SET_TOTAL(state, total) {
    state.total = total
  }
}

export const actions = {
  /**
   * 初始化客户列表参数
   * @param state
   * @param commit
   */
  infoCustomer({state, commit}) {
    commit('SET_PAGE', 1)
    commit('SET_KEYWORD', '')
  },
  /**
   * 获取客户列表
   * @param state
   * @param commit
   * @param loading
   */
  getCustomerList({state, commit}, loading = false) {
    // let {page, keyword} = state
    // let data = {page, keyword}
    // return API.Customer.getCustomerList({data, loading, toast: true, doctor(){}})
    //   .then((res) => {
    //     if (res.error !== app.$ERR_OK) {
    //       app.$toast.show(res.message)
    //       return
    //     }
    //     let list = res.data
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
  getMoreCustomerList({state, commit, dispatch}, obj) {
    typeof (obj.page) !== 'undefined' && commit('SET_PAGE', obj.page)
    typeof (obj.keyword) !== 'undefined' && commit('SET_KEYWORD', obj.keyword)
    dispatch('getCustomerList')
  }
}
