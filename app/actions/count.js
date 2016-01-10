import moment from 'moment'
import { createKey } from 'utils/history'

export function setCount(count, date, id) {
  const payload = Parse.Cloud.run('updateOrCreate', {model: 'Record',
    $where:  { date: date.toDate(), _User: Parse.User.current().id },
    $update: { count },
  })

  return {
    type: 'SET_COUNT',
    data: { count, date },
    payload: () => payload,
    throttle: 1000,
  }
}

export function setDay() {
  return (dispatch, getState) => {
    const date = moment()
    const { history } = getState()
    const record = history[createKey(date)]

    if (!record || !record.id) dispatch(setCount(0, date))

    return dispatch({
      type: 'SET_DAY',
      payload: date,
    })
  }
}
