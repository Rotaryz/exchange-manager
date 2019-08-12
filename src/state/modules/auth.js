import storage from 'storage-controller'
import API from '@api'
import {app as APP} from '../../main'
import HTTP from '@utils/http'

export const state = {
  currentUser: storage.get('auth.currentUser', 0), // 用户信息
}

export const getters = {
  // 判断用户是否已经登录
  loggedIn(state) {
    return !!state.currentUser
  }
}

export const mutations = {
  SET_CURRENT_USER(state, {user, token}) {
    state.currentUser = user
    storage.set('auth.currentUser', user)
    storage.set('auth.token', token)
    setDefaultAuthHeaders(state)
  }
}

export const actions = {
  // 初始化用户登录状态
  init({state, dispatch}) {
    setDefaultAuthHeaders(state)
    // dispatch('validate')
  },
  // 登录
  logIn({commit, dispatch, getters}, {username, password}) {
    if (getters.loggedIn) {
      return dispatch('validate')
    }
    let data = {username: username, password}
    return API.Auth.logIn({data})
      .then((res) => {
        if (res.error_code !== APP.$ERR_OK) {
          return null
        }
        const user = res.data.manager_info
        commit('SET_CURRENT_USER', {user, token: res.data.access_token})
        return user
      })
  },
  // 退出
  logOut({commit}) {
    commit('SET_CURRENT_USER', {user: null, token: null})
  },
  // 验证用户身份的有效性
  validate({commit, state, getters}) {
    if (!state.currentUser) {
      return Promise.resolve(null)
    }
    return API.Auth.validate({data: null, loading: false, toast: false})
      .then((res) => {
        if (res.error_code !== APP.$ERR_OK) {
          commit('SET_CURRENT_USER', {user: null, token: null})
          return null
        }
        console.log(getters.currentUser)
        const user = res.data.manager_info
        commit('SET_CURRENT_USER', {user, token: res.data.access_token})
        return user
      })
      .catch(() => {
        commit('SET_CURRENT_USER', {user: null, token: null})
        return null
      })
  }
}

/**
 * 设置默认请求头 Authorization
 * @param state
 */

function setDefaultAuthHeaders(state) {
  HTTP.setHeaders({
    Authorization: storage.get('auth.token', '')
  })
}
