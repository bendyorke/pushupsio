import moment from 'moment'
import { createKey } from 'utils/history'

/**
 * setCount is really just a throttled combination
 * of updateCount and saveCount.  TODO: Deprecate -
 * it can cause issues when dealing with multiple dates
 */
export function setCount(count, date, id) {
  const payload = () => Parse.Cloud.run('updateOrCreate', {model: 'Record',
    $where:  { date: date.toDate(), _User: Parse.User.current().id },
    $update: { count },
  })

  return {
    type: 'SET_COUNT',
    payload: () => payload,
    _payload: { count, date },
    throttle: 1000,
  }
}

export function updateCount(count, date) {
  return {
    type: 'UPDATE_COUNT',
    payload: { count, date },
  }
}

export function saveCount(count, date) {
  const payload = Parse.Cloud.run('updateOrCreate', {model: 'Record',
    $where:  { date: date.toDate(), _User: Parse.User.current().id },
    $update: { count },
  })

  return {
    type: 'SAVE_COUNT',
    payload: payload,
  }
}


/**
 * This is used on page load to ensure that there
 * is a count for the day.  TODO: Deprecate
 */
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
