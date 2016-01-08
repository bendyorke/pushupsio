import moment from 'moment'

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

export function setDay(newDate) {
  return (dispatch, getState) => {
    const { history, date: currentDate } = getState().count
    const date = newDate || currentDate
    const record = history[date.format('MMDDYY')]

    if (!record || !record.id) dispatch(setCount(0, date))

    return dispatch({
      type: 'SET_DAY',
      payload: date,
    })
  }
}
