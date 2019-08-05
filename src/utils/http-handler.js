import HTTP from '@utils/http'
import {app as APP} from '../main'
import { ERR_OK, TIME_OUT } from '@utils/config'

const COMMON_HEADER = {}

HTTP.init(http => {
  http.config.timeout = TIME_OUT
  http.config.headers = COMMON_HEADER
})

HTTP.setCallback({
  // 请求前处理
  beforeRequest({loading = true}) {
    if (loading) {
      showLoading()
    }
  },
  // 请求拦截
  willRequest(request) {
    request.url = resetUrl(request.url)
    return request
  },
  // 响应拦截
  willResponse(response) {
    return response
  },
  // 请求完成后的逻辑处理
  responseFulfilled(res, {url, loading = true, toast = true, success, fail}) {
    // if (typeof fail !== 'function') {
    //   const errorText = url + '-->' + '请添加doctor字段'
    //   console.error(errorText)
    //   throw new Error(errorText)
    // }
    // 可自定义处理loading
    res.isFail = false// 成功
    if (typeof loading === 'function') {
      loading(res)
    } else if (loading) {
      hideLoading()
    }
    if (res.code !== ERR_OK) {
      res.isFail = true// 有错
      errorCodeHandle(res.code)
    }
    // 可自定义处理toast错误
    if (res.error !== ERR_OK) {
      if (typeof toast === 'function') {
        toast(res)
      } else if (toast) {
        showToast(res.message)
      }
    }
    // 错误处理
    if (res.code !== ERR_OK || res.error !== ERR_OK) {
      res.isFail = true// 有错
      console.error(url + ' <<<<<<接口异常>>>>> ' + JSON.stringify(res))
      typeof fail !== 'function' && fail(res, url)
    }
    // 成功处理
    else if (typeof success === 'function') {
      return success(res)
    }

    return res
  }
})

// 错误码处理
function errorCodeHandle(code) {
  switch (code) {
    case 10000:
      break
    case 13005:
      break
    default:
      break
  }
}

function resetUrl(url) {
  const IS_PRODUCTION = process.env.NODE_ENV === 'production'
  if (IS_PRODUCTION) {
    return url
  }
  let pathname = window.location.pathname
  if (pathname && pathname.indexOf('/v') > -1) {
    let version = pathname.substr(1)
    url = url.split('api/').join(`${version}api/`)
    return url
  }
  return url
}

/**
 * 工具
 */
function showLoading() {
  APP && APP.$loading && APP.$loading.show()
}

function hideLoading() {
  APP && APP.$loading && APP.$loading.hide()
}

function showToast(message) {
  APP && APP.$toast && APP.$toast.show(message)
}
