import * as types from 'actions/types'
import Parse from 'parse'

export const updateUser = attrs => {
  const user = Parse.User.current()
  Object.entries(attrs).map(entry => user.set(...entry))

  return {
    type: types.UPDATE_USER,
    payload: user.save(),
  }
}

export const updateColor = color => {
  return {
    type: types.UPDATE_COLOR,
    payload: color,
  }
}
