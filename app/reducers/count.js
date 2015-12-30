import * as types from 'actions/types'
import moment from 'moment'

const init = {
  day: moment(),
  current: {count: 0},
  total: 0,
  history: {},
}

const dateKey = date => moment(date).format('MMDDYY')

const countObj = record => ({
  [dateKey(record.attributes.date)]: {
    id: record.id,
    count: record.attributes.count || 0,
  },
})

export default function countReducer(state = init, action) {
  switch(action.type) {
  case types.GET_COUNT_SUCCESS:
    const history = action.payload.reduce((memo, record) => ({
      ...memo,
      ...countObj(record),
    }), {})

    return {
      ...state,
      history,
      current: history[dateKey(state.day)] || {count: 0},
    }
  case types.SET_COUNT:
    return {
      ...state,
      current: { ...state.current, count: action.data.count },
    }
  case types.SET_COUNT_SUCCES:
    const nextCountObject = countObj(action.payload)
    return {
      ...state,
      history: {...history, ...nextCountObject},
      current: nextCountObject,
    }
  default:
    return state
  }
}
