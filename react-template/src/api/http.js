import axios from 'axios'
import { baseUrl } from '../common'
import qs from 'qs'
import { Toast } from 'antd-mobile'
import sendParams from './sign'

let url = window.location.href.split('?')[1]
let urlData = qs.parse(url)
let token = urlData['x-sid'] || '' // x-sid
if (process.env.NODE_ENV === 'development') {
  token = 'x7RswmqoLUn8JbcMMHvbTQGKGioXvWY9zJJXZqeFHwfknd'
}

export default function (options) {
  options.data = sendParams(options.data, options.url)
  return new Promise((resolve, reject) => {
    let createOption = {
      baseURL: baseUrl,
      timeout: 90000,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: options.token || token
        // 'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    if (
      createOption.headers['Content-Type'] ===
        'application/x-www-form-urlencoded' &&
      options.data
    ) {
      options.data = qs.stringify(options.data)
    }
    const instance = axios.create(createOption)
    instance.interceptors.request.use(
      (options) => options,
      (error) => Promise.reject(error)
    )
    instance.interceptors.response.use(
      (response) => {
        let { data } = response
        if (data.code === 0) {
          resolve(data.data)
        } else {
          if (options.noDialog === true) {
            reject(response.data || response)
          }
          // if (store.state.basic.isMobile) {
          //   Toast(fp.get('msg', data) || messages[lang].common.error_faild)
          // } else {
          Toast.info(data.msg || '请求失败')
          // }

          reject(response.data || response)
        }
      },
      (error) => {
        let { response = {} } = error
        //  if ([401, 403].indexOf(response.status) !== -1) {
        //    // 登陆失效
        //    router.push('/login')
        //    reject(
        //      fp.get('data', response) || {
        //        data: messages[lang].common.error_faild
        //      }
        //    )
        //  } else {
        if (options.noDialog === true) {
          reject(error.response.data)
          return false
        }
        let text
        if (response.status === 404) {
          text = '请求接口不存在'
        } else {
          if (
            error.message.includes('timeout') ||
            JSON.stringify(response) === '{}'
          ) {
            text = '网络超时，请稍后再试'
          } else if (error.response) {
            text = response.data.msg || '请求失败'
          } else {
            text = '请求失败'
          }
        }
        if (text) {
          // if (store.state.basic.isMobile) {
          //   Toast(text)
          // } else {
          Toast.info(text)
          // }
        }
        // Dialog({ type: 'error', text });
        reject(text)
        //  }
      }
    )
    instance(options)
  })
}
