import http from './http'
import qs from 'qs'
import sendParams from './sign'
const prefix = ''

// GET
export const get = (options) => {
  options.data = sendParams(options.data, options.url)
  let param = qs.stringify(options.data)
  param += '&_=' + new Date().getTime()
  return http({
    method: 'GET',
    url: `${prefix}${options.url}?${param}`,
    noDialog: options.noDialog ? options.noDialog : false
  })
}

// POST
export const post = (options) =>
  http({
    method: 'POST',
    url: `${prefix}${options.url}`,
    data: options.data,
    noDialog: options.noDialog ? options.noDialog : false
  })

// PUT
export const put = (options) =>
  http({
    method: 'PUT',
    url: `${prefix}${options.url}/PUT`,
    data: options.data,
    noDialog: options.noDialog ? options.noDialog : false
  })

// DELETE
export const del = (options) =>
  http({
    method: 'DELETE',
    url: `${prefix}${options.url}/PUT`,
    data: options.data,
    noDialog: options.noDialog ? options.noDialog : false
  })
