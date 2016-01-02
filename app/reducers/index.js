import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import analytics from './analytics'
import count from './count'
import user from './user'

export default combineReducers({
  routing: routeReducer,
  analytics,
  count,
  user,
})
