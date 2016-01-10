import moment from 'moment'
import { setDay } from 'actions/count'

export function initialize() {
  return dispatch => {
    Parse.Cloud.run('initialize')
      .then(payload => dispatch({ type: 'INITIALIZE', payload }))
      .then(() => dispatch(setDay()))
      .then(() => dispatch(calculate()))
  }
}

export function calculate() {
  return (dispatch, getState) => {
    const {
      history,
      user: { goal },
    } = getState()

    return dispatch({
      type: 'CALCULATE',
      payload: { history, goal }
    })
  }
}
