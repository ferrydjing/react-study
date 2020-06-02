import { fromJS } from 'immutable'
import { Toast } from 'antd-mobile'
import * as constants from './constants'
import * as http from '../../../api'
import { transGoodsData } from '../../../utils'
import Calc from 'better-calc'
import fp from 'lodash/fp'

const initCate = (list) => ({
  type: constants.INIT_CATE,
  list: fromJS(list)
})

const setList = (list, init) => ({
  type: constants.SET_LIST,
  list: fromJS(list),
  init
})

const updateDateSource = (list) => ({
  type: constants.UPDATE_DATASOURCE,
  list
})

const toDetail = (data, isApp, isWx) => {
  if (isApp) {
    var jsonStr = {
      page: 'GoodsDetailPage',
      data: {
        goods_id: data._id,
        item_source: data.item_source
      },
      closepage: 0
    }
    jsonStr = encodeURI(JSON.stringify(jsonStr))
    console.log(jsonStr)
    window.location.href = 'xkd://app/appPage?param=' + jsonStr
  } else if (isWx) {
    // eslint-disable-next-line no-undef
    wx.miniProgram.navigateTo({
      url:
        '/pages/detail/index?_id=' +
        data._id +
        '&item_source=' +
        data.item_source
    })
  } else {
    window.location.href = 'https://www.xinletao.vip/starDown.html'
  }
}

export const setIsLoading = (isLoading) => ({
  type: constants.SET_IS_LOADING,
  isLoading
})

export const setPage = (page) => ({
  type: constants.SET_PAGE,
  page
})

export const setHasMore = (hasMore) => ({
  type: constants.SET_HAS_MORE,
  hasMore
})

export const getCate = () => {
  return async (dispatch) => {
    Toast.loading('加载中', 0)
    const res = await http.get({
      url: 'v2/activity/ac20200521highrebate/goods/get-category',
      data: {}
    })
    dispatch(initCate(res))
    dispatch(getList(null, 1))
  }
}

export const getList = (item, init) => {
  return async (dispatch, getState) => {
    const state = getState()
    Toast.loading('加载中', 0)
    const res = await http.get({
      url: 'v2/activity/ac20200521highrebate/goods/list',
      data: {
        cate_id: item
          ? item._id
          : state.getIn(['app', 'tabs', state.getIn(['app', 'active']), '_id']),
        page: state.getIn(['app', 'page']),
        row: state.getIn(['app', 'row'])
      }
    })
    let list = transGoodsData(
      res.map((item) => ({
        ...item.goods_info
        // hight_rebate: item.hight_rebate
      })),
      (item) => {
        return {
          xlt_subsidy: Calc.div(
            fp.get('hight_rebate.xlt_subsidy', item) || 0,
            100
          ).toFixed(2),
          xlt_subsidy_show: `奖励${Calc.div(
            fp.get('hight_rebate.xlt_subsidy', item) || 0,
            100
          ).toFixed(2)}元`
        }
      }
    )
    if (list.length < state.getIn(['app', 'row'])) {
      dispatch(setHasMore(false))
    }
    dispatch(setList(list, init))
    dispatch(setPage(state.getIn(['app', 'page']) + 1))
    dispatch(updateDateSource(list))
    Toast.hide()
  }
}

export const activeChange = (index) => ({
  type: constants.ACTIVE_CHANGE,
  index
})

export const shareInApp = () => {
  return (dispatch, getState) => {
    const state = getState()
    let jsonStr = {
      title: '高佣爆品，实时抢购',
      content: '独家高佣，超值爆品，最高返90%',
      url:
        window.location.origin +
        window.location.pathname +
        '?inviteCode=' +
        state.getIn(['base', 'inviteCode']),
      pic_url:
        window.location.origin + '/activity/ac20200521highrebate/img/share.png'
    }
    jsonStr = encodeURIComponent(JSON.stringify(jsonStr))
    window.location.href = 'xkd://app/share?param=' + jsonStr
  }
}

export const toTurn = (data) => {
  return async (dispatch, getState) => {
    const state = getState()
    const isApp = state.getIn(['base', 'isApp'])
    const isWx = state.getIn(['base', 'isWx'])
    await http.post({
      url: 'v2/activity/ac20200521highrebate/main/join',
      data: {
        goods_id: data._id
      }
    })
    toDetail(data, isApp, isWx)
  }
}

export const onReached = () => {
  return (dispatch, getState) => {
    const state = getState()
    const isLoading = state.getIn(['app', 'isLoading'])
    const hasMore = state.getIn(['app', 'hasMore'])
    if (isLoading || !hasMore) {
      return
    }
    dispatch(setIsLoading(true))
    dispatch(getList())
  }
}
