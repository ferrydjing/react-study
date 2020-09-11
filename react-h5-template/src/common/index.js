let url = ''
if (process.env.REACT_APP_MODE === 'test') {
  url = 'https://api-t2.xin1.cn'
} else if (process.env.NODE_ENV === 'development') {
  url = '/api'
} else {
  url = '/api'
}

export const baseUrl = url
