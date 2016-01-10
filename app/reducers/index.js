import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import analytics from './analytics'
import history from './history'
import user from './user'

export default combineReducers({
  routing: routeReducer,
  analytics,
  history,
  user,
})
