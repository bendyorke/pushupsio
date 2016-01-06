import createReducer from 'reducers/createReducer'
import Parse from 'parse'

const userObject = (user = {}) => ({
  ...user,
  ...user.attributes,
  stored: { ...user.attributes },
})

const initial = userObject(Parse.User.current() || {})

const userReducer = (state, action) => ({
  INITIALIZE() {
    const currentUser = Parse.User.current()
    if (currentUser) currentUser.set(action.payload.user)
    return userObject(action.payload.user || {})
  },

  UPDATE_USER_SUCCESS() {
    Parse.User.current().set(action.payload.user)
    return userObject(action.payload)
  },

  SIGN_OUT_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_UP_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_SUCCESS() {
    return userObject(action.payload)
  },

  UPDATE_COLOR() {
    return { ...state, color: action.payload }
  },
})

export default createReducer(userReducer, initial)
