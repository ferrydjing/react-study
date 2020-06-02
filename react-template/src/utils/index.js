import fp from 'lodash/fp'
import dayjs from 'dayjs'
import Calc from 'better-calc'

export const rem = (px) => {
  return px / 100 + 'rem'
}

/**
 *
 * 格式化商品数据的方法
 * @param {array} arr 原始商品列表
 * @param {function} func 更多的字段可以使用这个方法加上去
 */
export const transGoodsData = (arr = [], func = () => ({})) => {
  // 要返回的数据
  let res = []
  // 输入的数据
  let data = []
  if (fp.isArrayLike(arr)) {
    data = arr
  } else if (fp.isObject(arr)) {
    data = [arr]
  }
  // 产品说简单点,就和本地时间做判断,APP也是这样做的
  const now = dayjs().unix()
  res = data.map((item) => {
    // 优惠券的状态-1:未知,0未开始,1:进行中,2:结束(已过期)
    let couponOverdue = -1
    const start = fp.get('coupon.start_time', item) || undefined
    const end = fp.get('coupon.end_time', item) || undefined
    const isStartValid = dayjs.unix(start).isValid()
    const isEndValid = dayjs.unix(end).isValid()
    if (!isStartValid || !isEndValid) {
      // 开始时间结束时间有一个未知,就返回-1
      couponOverdue = -1
    } else if (now < start) {
      couponOverdue = 0
    } else if (now > end) {
      couponOverdue = 2
    } else {
      couponOverdue = 1
    }
    // 到底显不显示优惠券
    const couponVisible = !!(
      couponOverdue !== 2 && fp.get('coupon.amount', item)
    )
    return {
      ...{
        // 原始的数据
        _source: item,
        // 商品_id goods_id是de-code接口用到的
        _id: item._id || item.goods_id,
        // item_id 历史上用过
        item_id: item.item_id,
        // 商品的状态 -1:不存在 0:下架 1:上架
        status: item._id ? item.status : -1,
        // 商品来源的平台
        item_source: item.item_source,
        // 商品图片pict_url是de-code接口用到的
        item_image: item.item_image || item.pict_url,
        // 商品标题
        item_title: item.item_title || item.title,
        // 优惠券金额
        coupon_amount: toYuan({
          value: fp.get('coupon.amount', item),
          thousandCentimeter: false,
          decimalIfNeeded: true
        }),
        // 优惠券状态-1未知,0未开始,1进行中,2已结束(过期)
        couponOverdue,
        // 显不显示优惠券(boolean)
        couponVisible,
        couponStart: start,
        couponEnd: end,
        // 格式化的优惠券开始时间
        couponStartTimeStr: isStartValid
          ? dayjs.unix(start).format('YYYY-MM-DD')
          : '',
        // 格式化的优惠券结束时间
        couponEndTimeStr: isEndValid
          ? dayjs.unix(end).format('YYYY-MM-DD')
          : '',
        // 返好多钱
        rebate_amount: toYuan({
          value: fp.get('rebate.xkd_amount', item),
          thousandCentimeter: false
        }),
        // 京东plus返好多钱
        jd_plus: toYuan({
          value: fp.get('jd_plus', item),
          thousandCentimeter: false
        }),
        // 券后价
        item_price: toYuan({
          value: item.item_price,
          thousandCentimeter: false
        }),
        // 划线价
        item_min_price: toYuan({
          value: item.item_min_price,
          thousandCentimeter: false
        }),
        // 邮费
        item_delivery_postage: toYuan({
          value: item.item_delivery_postage,
          thousandCentimeter: false
        }),
        // 是否该展示包邮标签
        labelFreeShippingVisible: !item.item_delivery_postage,
        // 销量
        item_sell_count: toFans(item.item_sell_count || 0),
        // 店铺本身
        seller: item.seller,
        // 店铺id
        seller_shop_id:
          fp.get('seller.seller_shop_id', item) || item.seller_shop_id,
        // 店铺名称
        seller_shop_name:
          fp.get('seller.seller_shop_name', item) || item.seller_shop_name,
        // 店铺来源
        seller_shop_type_text: GOODS_SOURCE_TYPE[fp.get('item_source', item)],
        // 店铺类型
        seller_shop_type: fp.get('item_source', item),
        // 店铺等级
        seller_shop_level: fp.get('seller.credit_level', item),
        // 是否收藏
        is_fav: item.is_fav
      },
      ...func(item)
    }
  })
  if (fp.isArrayLike(arr)) {
    return res
  } else if (fp.isObject(arr)) {
    return res[0]
  }
}

const toYuan = ({
  value = 0,
  decimal = 2,
  decimalIfNeeded = false,
  thousandCentimeter = true
}) => {
  value = +value
  let yuan = Calc.div(value, 100).toFixed(decimal)
  if (thousandCentimeter) {
    yuan = toThousandCentimeter(yuan)
  }
  // 只显示必要的小数，比如5.00将显示为5,5.10将显示为5.1
  if (decimalIfNeeded) {
    return fp.trimCharsEnd('.', fp.trimCharsEnd('0', yuan))
  }
  return yuan
}

const toThousandCentimeter = (numStr = '') => {
  if (!numStr) return '0'
  numStr += ''
  if (!numStr.includes('.')) {
    numStr += '.'
  }
  return numStr
    .replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
      return $1 + ','
    })
    .replace(/\.$/, '')
}

// const GOODS_SOURCE = {
//   // 淘宝
//   TB: 'C',
//   // 天猫
//   TM: 'B',
//   // 京东
//   JD: 'D',
//   // 拼多多
//   PDD: 'P',
//   // 所有
//   ALL: ''
// }

// 商品来源 代码和对应的中文
export const GOODS_SOURCE_TYPE = {
  // 天猫
  B: '天猫',
  // 淘宝
  C: '淘宝',
  // 京东
  D: '京东',
  // 拼多多
  P: '拼多多',
  V: '唯品会'
}

const toFans = (numStr) => {
  numStr = Number(numStr)
  if (numStr < 10000) {
    return numStr
  } else {
    return (numStr / 10000).toFixed(1) + '万'
  }
}
