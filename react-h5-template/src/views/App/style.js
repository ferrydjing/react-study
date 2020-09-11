import styled from 'styled-components'
import { rem } from '@/utils'
import couponImg from '@/assets/imgs/bg-goods-coupon.png'

export const AppWrap = styled.section`
  margin: 0 auto 0;
  max-width: ${rem(768)};
`

export const BannerWrap = styled.div`
  img {
    width: 100%;
  }
`
export const AppTabs = styled.div`
  margin-top: ${rem(-20)};
  max-width: 100%;
  overflow: hidden;
  border-radius: ${rem(20)} ${rem(20)} 0 0;
  .am-tabs-default-bar-tab {
    height: ${rem(104)};
  }
  .am-tabs-default-bar-underline {
    border: none;
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: ${rem(-6)};
      transform: translateX(-50%);
      height: ${rem(4)};
      width: ${rem(60)};
      background: #ff8202;
      border-radius: ${rem(2)};
    }
  }
  .am-list-body {
    &::before {
      display: none !important;
    }
  }
`

export const GoodItem = styled.div`
  position: relative;
  display: flex;
  padding: ${rem(37)} ${rem(30)} 0 ${rem(20)};
  height: ${rem(313)};
  box-sizing: border-box;
  background: #fff;
  &:not(:last-child) {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: ${rem(1)};
      background: #ebebed;
    }
  }
`

export const GoodItemLogoWrap = styled.div`
  position: relative;
  flex-shrink: 0;
  width: ${rem(240)};
  height: ${rem(240)};
  border-radius: ${rem(10)};
  img {
    width: ${rem(240)};
    height: ${rem(240)};
    border-radius: ${rem(10)};
  }
`

export const GoodItemLogoPost = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${rem(64)};
  height: ${rem(34)};
  font-size: ${rem(22)};
  color: #fff;
  line-height: 1;
  background: #7046e0;
  border-radius: ${rem(10)} 0px ${rem(10)} 0px;
`

export const GoodItemContent = styled.div`
  margin-left: ${rem(20)};
  flex: 1;
`

export const GoodItemTitle = styled.div`
  position: relative;
  margin-bottom: ${rem(26)};
  font-size: ${rem(28)};
  color: #25282d;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  line-height: 1.5;
  -webkit-line-clamp: 2; /* 行数*/
  -webkit-box-orient: vertical;
`

export const GoodItemRow = styled.div`
  font-size: 0;
`

export const GoodItemCoupon = styled.div`
  margin-right: ${rem(20)};
  vertical-align: top;
  box-sizing: border-box;
  display: inline-block;
  height: ${rem(35)};
  min-width: ${rem(100)};
  padding: 0 ${rem(14)};
  color: #fff;
  font-size: ${rem(20)};
  line-height: ${rem(35)};
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  background: linear-gradient(
    270deg,
    rgba(246, 114, 114, 1),
    rgba(247, 55, 55, 1)
  );
  background-image: url(${couponImg});
  background-repeat: no-repeat;
  background-size: 100% ${rem(35)};
  font-weight: bold;
`
export const GoodItemRebate = styled.div`
  vertical-align: top;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  height: ${rem(35)};
  padding: 0 ${rem(11)};
  font-size: ${rem(20)};
  font-weight: bold;
  color: #ff8202;
  line-height: 1;
  white-space: nowrap;
  background-color: #fff9f2;
  border: ${rem(1)} solid rgba(255, 130, 2, 0.73);
  border-radius: ${rem(4)};
`

export const GoodItemAmount = styled.div`
  margin-left: ${rem(12)};
  vertical-align: top;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  height: ${rem(35)};
  padding: 0 ${rem(11)};
  font-size: ${rem(20)};
  font-weight: bold;
  color: #7046e0;
  line-height: 1;
  white-space: nowrap;
  background: rgba(112, 70, 224, 0.05);
  border: ${rem(1)} solid rgba(112, 70, 224, 0.73);
  border-radius: ${rem(4)};
`

export const GoodItemPriceRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${rem(50)};
`

export const GoodItemPriceTitle = styled.div`
  font-size: ${rem(24)};
  color: #25282d;
  white-space: nowrap;
`

export const GoodItemPrice = styled.div`
  font-size: ${rem(32)};
  color: #f34264;
  font-weight: bold;
  white-space: nowrap;
`

export const GoodItemMarkedPrice = styled.div`
  padding-top: ${rem(10)};
  margin-left: ${rem(10)};
  font-size: ${rem(22)};
  color: #c3c4c7;
  text-decoration: line-through;
  white-space: nowrap;
`

export const GoodItemPanicBuying = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  width: ${rem(50)};
  height: ${rem(50)};
  font-size: ${rem(28)};
  color: #fff;
  background: linear-gradient(
    180deg,
    rgba(255, 110, 2, 1),
    rgba(255, 174, 1, 1)
  );
  border-radius: ${rem(10)};
`

export const ShareFixed = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 20px 0;
  background: #fff;
  box-shadow: 0px 1px 16px 0px rgba(123, 129, 138, 0.18);

  button {
    z-index: 1;
    position: relative;
    display: block;
    width: 90%;
    margin: 0 auto;
    height: 40px;
    background: linear-gradient(
      90deg,
      rgba(255, 157, 2, 1),
      rgba(255, 103, 2, 1)
    );
    border-radius: 40px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    border: none;
  }
`

export const HasMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SpinWrap = styled.div`
  margin-right: ${rem(20)};
  color: rgb(25, 137, 250);
  font-size: 0;
  display: inline-block;
  width: 30px;
  max-width: 100%;
  height: 30px;
  max-height: 100%;
  animation: van-rotate 1.2s linear infinite;
  svg {
    display: block;
    width: 100%;
    height: 100%;
    color: rgb(25, 137, 250);
    &:not(:root) {
      overflow: hidden;
    }
    circle {
      transform-origin: 0px 0px;
      animation: van-circular 1.5s ease-in-out infinite;
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
    }
    @keyframes van-circular {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -40;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -120;
      }
    }
  }
  @keyframes van-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
