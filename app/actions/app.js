import * as types from './types'
import Parse from 'parse'
import moment from 'moment'
import { setDay } from 'actions/count'

export function initialize() {
  return dispatch => {
    Parse.Cloud.run('initialize')
      .then(payload => dispatch({ type: types.INITIALIZE, payload }))
      .then(() => dispatch(setDay()))
      .then(() => dispatch(calculate()))
  }
}

export function calculate() {
  return (dispatch, getState) => {
    const {
      count: { history },
      user: { goal },
    } = getState()

    return dispatch({
      type: types.CALCULATE,
      payload: { history, goal }
    })
  }
}
