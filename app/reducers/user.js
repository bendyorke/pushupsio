import * as types from 'actions/types'

export default function(state = {}, action) {
  switch(action.type) {
  case types.INITIALIZE:
  case types.SIGNOUT_SUCCESS:
  case types.SIGNUP_SUCCESS:
  case types.SIGNIN_SUCCESS:
    return { ...action.payload }
  default:
    return state
  }
}
