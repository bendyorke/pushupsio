import createReducer from 'reducers/createReducer'

const userObject = (user = {}) => ({
  ...user,
  ...user.attributes,
  stored: { ...user.attributes },
})

const initial = userObject(Parse.User.current() || {})

const setAmpId = id => {
  if (__PROD__ && window.amplitude) window.amplitude.setUserId(id)
}

const userReducer = (state, action) => ({
  INITIALIZE() {
    const user = action.payload.user || {}
    setAmpId(user.id)

    const currentUser = Parse.User.current()
    if (currentUser) {
      const { sessionToken, ...attributes } = currentUser
      currentUser.set(attributes)
    }

    return userObject(user)
  },

  SAVE_USER_SUCCESS() {
    const user = {...action.payload, ...action.payload.attributes}
    const { sessionToken, ...attributes } = user
    Parse.User.current().set(attributes)

    return userObject(action.payload)
  },

  SIGN_OUT_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_UP_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_SUCCESS() {
    const user = action.payload || {}
    setAmpId(user.id)

    return userObject(user)
  },

  UPDATE_USER() {
    return { ...state, ...action.payload }
  },
})

export default createReducer(userReducer, initial)
