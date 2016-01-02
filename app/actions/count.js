import * as types from 'actions/types'
import Parse from 'parse'

const Record = Parse.Object.extend('Record')

const recordQuery = day => {
  const query = new Parse.Query(Record)
  if (day) query.equalTo('date', day.startOf('day').toDate())
  query.equalTo('user', Parse.User.current())
  return query
}

const saveRecord = ({id, day, count}) => {
  const record = new Record()
  if (!!id) record.id = id
  record.set('count', count || 0)
  record.set('date', day.startOf('day').toDate())
  record.set('user', Parse.User.current())
  return record.save()
}

export function getCount() {
  return {
    type: types.GET_COUNT,
    payload: recordQuery().find(),
  }
}

export function setCount(count, day, id) {
  return {
    type: types.SET_COUNT,
    data: { count, day },
    payload: () => saveRecord({count, day, id}),
    throttle: 1000,
  }
}

export function setDay(day) {
  return (dispatch, getState) => {
    const record = getState().count.history[day.format('MMDDYY')]
    if (!record || !record.id) dispatch(setCount(0, day))

    return dispatch({
      type: types.SET_DAY,
      payload: day,
    })
  }
}
