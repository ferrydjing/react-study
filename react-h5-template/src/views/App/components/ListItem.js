import React, { memo } from 'react'
import { connect } from 'react-redux'
import { actionCreaters } from '../store'
import {
  GoodItem,
  GoodItemLogoWrap,
  GoodItemLogoPost,
  GoodItemContent,
  GoodItemTitle,
  GoodItemRow,
  GoodItemCoupon,
  GoodItemRebate,
  GoodItemAmount,
  GoodItemPriceRow,
  GoodItemPriceTitle,
  GoodItemPrice,
  GoodItemMarkedPrice,
  GoodItemPanicBuying
} from '../style'

const ListItem = (props) => {
  const { data, isApp, isWx, handleItemClick } = props
  return (
    <GoodItem onClick={() => handleItemClick(isApp, isWx, data)}>
      <GoodItemLogoWrap>
        <img src={data.item_image} alt='' />
        {data.labelFreeShippingVisible && (
          <GoodItemLogoPost>包邮</GoodItemLogoPost>
        )}
      </GoodItemLogoWrap>
      <GoodItemContent>
        <GoodItemTitle>{data.item_title}</GoodItemTitle>
        <GoodItemRow>
          {data.couponVisible && (
            <GoodItemCoupon>{data.coupon_amount}元券</GoodItemCoupon>
          )}
          {+data.rebate_amount > 0 && (
            <GoodItemRebate>返{data.rebate_amount}</GoodItemRebate>
          )}
          {+data.xlt_subsidy > 0 && (
            <GoodItemAmount>{data.xlt_subsidy_show}</GoodItemAmount>
          )}
        </GoodItemRow>
        <GoodItemPriceRow>
          {data.couponVisible && <GoodItemPriceTitle>券后</GoodItemPriceTitle>}
          <GoodItemPrice>{data.item_price}</GoodItemPrice>
          <GoodItemMarkedPrice>{data.item_min_price}</GoodItemMarkedPrice>
          <GoodItemPanicBuying>抢</GoodItemPanicBuying>
        </GoodItemPriceRow>
      </GoodItemContent>
    </GoodItem>
  )
}

const mapState = (state) => ({
  isApp: state.getIn(['base', 'isApp']),
  isWx: state.getIn(['base', 'isWx'])
})

const mapDispatch = (dispatch) => ({
  handleItemClick(isApp, isWx, data) {
    if (!isWx && !isApp) {
      window.location.href = 'https://www.xinletao.vip/starDown.html'
    } else {
      dispatch(actionCreaters.toTurn(data))
    }
  }
})

export default connect(mapState, mapDispatch)(memo(ListItem))
