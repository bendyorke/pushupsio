import * as types from './types'
import Parse from 'parse'
export { types as types }
export * from 'actions/auth'
export * from 'actions/count'

export function initialize() {
  return { type: types.INITIALIZE, payload: Parse.User.current() }
}
