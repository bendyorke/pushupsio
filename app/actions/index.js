import * as types from './types'
import Parse from 'parse'
export { types as types }
export * from 'actions/auth'
export * from 'actions/count'
export * from 'actions/user'

export function initialize() {
  return { type: types.INITIALIZE, payload: Parse.User.current() }
}

export function calculate() {
  return (dispatch, getState) => {
    const {
      count: { history = {} },
      user: { goal = 0 },
    } = getState()
    return dispatch({
      type: types.CALCULATE,
      payload: { history, goal }
    })
  }
}
