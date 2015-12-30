import * as types from 'actions/types'
import Parse from 'parse'

export const signIn = (email, password) => {
  return {
    type: types.SIGNIN,
    payload: Parse.User.logIn(email, password),
  }
}

export const signUp = (email, password) => {
  const user = new Parse.User()
  user.set('email', email)
  user.set('username', email)
  user.set('password', password)

  return {
    type: types.SIGNIN,
    payload: user.signUp(),
  }
}

export const signOut = () => {
  return {
    type: types.SIGNOUT,
    payload: Parse.User.logOut(),
  }
}
