export const saveUser = attrs => {
  const user = Parse.User.current()
  Object.entries(attrs).map(entry => user.set(...entry))

  return {
    type: 'SAVE_USER',
    payload: user.save(),
  }
}

export const updateUser = attrs => {
  return {
    type: 'UPDATE_USER',
    payload: attrs,
  }
}
