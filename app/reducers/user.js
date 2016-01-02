import * as types from 'actions/types'
import Parse from 'parse'

export default function(state = {}, action) {
  switch(action.type) {
  case types.INITIALIZE:
    const user = Parse.User.current() || {}
    return user.id ? { ...user, ...user.attributes } : state
  case types.SIGNOUT_SUCCESS:
  case types.SIGNUP_SUCCESS:
  case types.SIGNIN_SUCCESS:
  case types.UPDATE_USER_SUCCESS:
    return { ...action.payload }
  default:
    return state
  }
}
