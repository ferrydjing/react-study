import { combineReducers } from 'redux-immutable'
import { reducer as AppReducer } from '../views/App/store'
import { reducer as BaseReducer } from './base'

export default combineReducers({
  base: BaseReducer,
  app: AppReducer
})
