import * as types from 'actions/types'
import moment from 'moment'
import { createKey, createHistoryItem } from 'utils/history'

const init = {
  date: moment().startOf('day'),
  current: {
    id: undefined,
    key: undefined,
    count: 0
  },
  total: 0,
  history: {},
}

export default function countReducer(state = init, action) {
  switch(action.type) {
  case types.INITIALIZE:
    let records = action.payload.records || []

    let history = records.reduce((memo, record) => {
      let { key, ...historyItem } = createHistoryItem({
        ...record,
        ...record.attributes
      })

      return { ...memo, [key]: historyItem }
    }, {})

    let current = createHistoryItem({ date: state.date })

    return { ...state, history, current }

  case types.SET_DAY:
    let dayInHistory = state.history[createKey(action.payload)]
    return {
      ...state,
      date: action.payload,
      current: createHistoryItem(dayInHistory),
    }

  case types.SET_COUNT:
    let { key: historyKey, ...newHistoryItem } = createHistoryItem({
      ...state.history[createKey(action.data.date)],
      date: action.data.date,
      count: action.data.count
    })

    let existingHistoryItem = state.history[historyKey] || {}

    return {
      ...state,
      history: { ...state.history, [historyKey]: {
        ...existingHistoryItem,
        ...newHistoryItem,
      }},
      current: { ...state.current, count: action.data.count },
    }

  case types.SET_COUNT_SUCCESS:
    let { key, ...historyItem } = createHistoryItem({
      ...temp,
      ...temp.attributes,
    })

    return {
      ...state,
      history: { ...state.history, [key]: historyItem },
      current: { key, ...historyItem }
    }

  default:
    return state
  }
}
