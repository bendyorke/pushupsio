import * as types from 'actions/types'
import Parse from 'parse'

const userObject = (user = {}) => ({
  ...user,
  ...user.attributes,
  stored: { ...user.attributes },
})

const init = userObject(Parse.User.current() || {})

export default function(state = init, action) {
  switch(action.type) {
  case types.INITIALIZE:
    let currentUser = Parse.User.current()
    if (currentUser) currentUser.set(action.payload.user)
    return userObject(action.payload.user || {})

  case types.UPDATE_USER_SUCCESS:
    Parse.User.current().set(action.payload.user)
    return userObject(action.payload)

  case types.SIGN_OUT_SUCCESS:
  case types.SIGN_UP_SUCCESS:
  case types.SIGN_IN_SUCCESS:
    return userObject(action.payload)

  case types.UPDATE_COLOR:
    return { ...state, color: action.payload }

  default:
    return state
  }
}
