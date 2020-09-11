import { fromJS } from 'immutable'
import qs from 'qs'

let url = window.location.href.split('?')[1]
let urlData = qs.parse(url)

const defaultObj = {
  bottomHeight: '20px',
  barHeight: 0,
  isApp: urlData.appId === '200201' && urlData.isApp === '1' ? true : false,
  isWx: urlData['x-wx'] === '1' ? true : false,
  token: urlData['x-sid'] || ''
}

if (process.env.NODE_ENV === 'development') {
  defaultObj.token = 'x7RswmqoLUn8JbcMMHvbTQGKGioXvWY9zJJXZqeFHwfknd'
}

if (defaultObj.isApp) {
  defaultObj['x-in-client'] = 1
  defaultObj.bottomHeight = '100px'
}

if (urlData['x-m'] && urlData['x-m'] !== '') {
  defaultObj['x-m'] = urlData['x-m']
}

const defaultState = fromJS(defaultObj)

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
