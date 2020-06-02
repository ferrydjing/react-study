import qs from 'qs'
import { cloneDeep } from 'lodash'
var CryptoJS = require('crypto-js')

let url = window.location.href.split('?')[1]
let urlData = qs.parse(url)
const defaultData = { data: {} }
const isAPP = urlData.appId === '200201' && urlData.isApp === '1' ? true : false
if (isAPP) {
  defaultData['x-in-client'] = 1
}

// 是否是微信
if (urlData['x-wx'] === '1') {
  defaultData['x-wx'] = 1
}
// 加x-m
if (urlData['x-m'] && urlData['x-m'] !== '') {
  defaultData['x-m'] = urlData['x-m']
}

var uaOther = navigator.userAgent.toLowerCase(),
  isWx = false

if (uaOther.match(/MicroMessenger/i) === 'micromessenger') {
  //微信浏览器
  isWx = true
}

function sendParams(obj, apiUrl) {
  let curObj = cloneDeep(defaultData)
  curObj.data = obj
  curObj.sign = getSign(curObj, apiUrl)
  curObj.data = JSON.stringify(curObj.data)
  return curObj
}

function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg) //匹配目标参数
  if (r != null) return decodeURIComponent(r[2])
  return null //返回参数值
}

function getSign(p_SendData, apiUrl) {
  var paramsData = p_SendData.data
  var $t = (p_SendData.t = new Date().getTime())
  p_SendData['x-app-source'] = 2
  p_SendData['x-dev-type'] = 2
  p_SendData['x-client-type'] = 3
  p_SendData['appid'] = '200203'
  p_SendData['type'] = 'json'
  if (!p_SendData.isAll) {
    if (getUrlParam('appId') === '200201' && getUrlParam('isApp') === '1') {
      p_SendData['x-in-client'] = 1
    }

    if (getUrlParam('isWx') || isWx) {
      p_SendData['x-wx'] = 1
    }

    if (getUrlParam('x-m')) {
      p_SendData['x-m'] = getUrlParam('xM')
    }
  }

  var $text = ''
  var newArr = []
  var $appkey = 'u0UMcrdo4olujZ5pItnY!ym3Oz!qJH3W'
  var $appId = '200203'
  var $urlPath = apiUrl
  /**
   * 对data中的数据作处理
   */
  // 把data里的key提出来组成一个新数组
  newArr = new ksort(paramsData)
  //  console.log("newArr",JSON.stringify(newArr));
  for (var j in newArr) {
    var objValue = newArr[j]
    if (typeof objValue == 'object') {
      objValue = JSON.stringify(objValue)
    }
    $text += j + '=' + objValue
  }
  /**
   * 生成校验文字
   */
  var $newText =
    CryptoJS.MD5($appkey).toString().substr(5, 7) +
    $text.substr(0, 5) +
    $appId +
    $urlPath +
    $text +
    $t +
    $text.substr(-5)

  //  console.log('newText:' + $newText);
  // return hex_hmac_md5(, );
  return CryptoJS.HmacMD5($newText, $appkey).toString()
}

function ksort(inputArr, sort_flags) {
  var tmp_arr = {},
    keys = [],
    sorter,
    i,
    k,
    that = this,
    strictForIn = false,
    populateArr = {}

  switch (sort_flags) {
    case 'SORT_STRING':
      // compare items as strings
      sorter = function (a, b) {
        return that.strnatcmp(a, b)
      }
      break
    case 'SORT_LOCALE_STRING':
      // compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)
      var loc = this.i18n_loc_get_default()
      sorter = this.php_js.i18nLocales[loc].sorting
      break
    case 'SORT_NUMERIC':
      // compare items numerically
      sorter = function (a, b) {
        return a + 0 - (b + 0)
      }
      break
    // case 'SORT_REGULAR': // compare items normally (don't change types)
    default:
      sorter = function (a, b) {
        var aFloat = parseFloat(a),
          bFloat = parseFloat(b),
          aNumeric = aFloat + '' === a,
          bNumeric = bFloat + '' === b
        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0
        } else if (aNumeric && !bNumeric) {
          return 1
        } else if (!aNumeric && bNumeric) {
          return -1
        }
        return a > b ? 1 : a < b ? -1 : 0
      }
      break
  }
  // Make a list of key names
  // inputArr = Object.assign(inputArr, {
  //     'appkey': "cnmobicloud2017"
  // });
  //  console.log(inputArr)
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k)
    }
  }
  keys.sort(sorter)

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {}
  this.php_js.ini = this.php_js.ini || {}
  // END REDUNDANT
  strictForIn =
    this.php_js.ini['phpjs.strictForIn'] &&
    this.php_js.ini['phpjs.strictForIn'].local_value &&
    this.php_js.ini['phpjs.strictForIn'].local_value !== 'off'
  populateArr = strictForIn ? inputArr : populateArr

  // Rebuild array with sorted key names
  for (i = 0; i < keys.length; i++) {
    k = keys[i]
    tmp_arr[k] = inputArr[k]
    if (strictForIn) {
      delete inputArr[k]
    }
  }
  for (i in tmp_arr) {
    if (tmp_arr.hasOwnProperty(i)) {
      populateArr[i] = tmp_arr[i]
    }
  }

  return strictForIn || populateArr
}

export default sendParams
