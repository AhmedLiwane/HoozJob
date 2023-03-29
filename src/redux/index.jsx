import { combineReducers } from 'redux'
import AuthReducer from './Auth/reducer'
import LangReducer from './Language/reducer'
import UserReducer from './User/reducer'
import StatisticsReducer from './Statistics/reducer'
import MemberReducer from './Teammember/reducer'
import CategoryReducer from './Categories/reducer'

const reducers = combineReducers({
  AuthReducer,
  LangReducer,
  UserReducer,
  StatisticsReducer,
  MemberReducer,
  CategoryReducer
})

export default reducers
