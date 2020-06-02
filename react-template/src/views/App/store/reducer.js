import { fromJS } from 'immutable'
import * as constants from './constants'
import { ListView } from 'antd-mobile'
import { rem } from '../../../utils'

const defaultState = fromJS({
  tabs: [],
  list: [],
  active: 0,
  page: 1,
  row: 10,
  hasMore: true,
  refreshing: false,
  isLoading: false,
  height: 0,
  inviteCode: '11111',
  dataSource: new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  })
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.INIT_CATE:
      return state.set('tabs', action.list)
    case constants.ACTIVE_CHANGE:
      return state.set('active', action.index)
    case constants.SET_LIST:
      return action.init
        ? state.merge({
            list: action.list,
            height: rem(action.list.size * 313 + 80)
          })
        : state.merge({
            list: state.get('list').concat(action.list),
            height: rem(state.get('list').concat(action.list).size * 313 + 80)
          })
    case constants.UPDATE_DATASOURCE:
      return state.set(
        'dataSource',
        state.get('dataSource').cloneWithRows(state.get('list').toJS())
      )
    case constants.SET_IS_LOADING:
      return state.set('isLoading', action.isLoading)
    case constants.SET_PAGE:
      return state.set('page', action.page)

    case constants.SET_HAS_MORE:
      return state.set('hasMore', action.hasMore)
    default:
      return state
  }
}
