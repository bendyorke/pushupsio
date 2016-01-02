import * as types from 'actions/types'
import moment from 'moment'

const init = {
  day: moment(),
  current: {count: 0},
  total: 0,
  history: {},
}

const dateKey = date => moment(date).format('MMDDYY')
const countObj = record => ({ id: record.id, count: record.count || 0, moment: moment(record.date) })
const historyObj = record => ({ [dateKey(record.date)]: countObj(record) })

export default function countReducer(state = init, action) {
  switch(action.type) {
  case types.GET_COUNT_SUCCESS:
    const history = action.payload.reduce((memo, record) => ({
      ...memo,
      ...historyObj({...record, ...record.attributes}),
    }), {})

    return {
      ...state,
      history,
      current: history[dateKey(state.day)] || {count: 0},
    }
  case types.SET_COUNT:
    return {
      ...state,
      history: {...state.history, [dateKey(action.data.day)]: {
        ...state.history[dateKey(action.data.day)],
        count: action.data.count,
      }},
      current: { ...state.current, count: action.data.count },
    }
  case types.SET_COUNT_SUCCESS:
    return {
      ...state,
      history: {...state.history, ...historyObj(action.payload)},
      current: countObj(action.payload),
    }
  default:
    return state
  }
}
