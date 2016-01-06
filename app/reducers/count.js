import createReducer from 'reducers/createReducer'
import moment from 'moment'
import { createKey, createHistoryItem } from 'utils/history'

const initial = {
  date: moment().startOf('day'),
  current: {
    id: undefined,
    key: undefined,
    count: 0
  },
  total: 0,
  history: {},
}

const countReducer = (state, action) => ({
  INITIALIZE() {
    const records = action.payload.records || []

    const history = records.reduce((memo, record) => {
      let { key, ...historyItem } = createHistoryItem({
        ...record,
        ...record.attributes
      })

      return { ...memo, [key]: historyItem }
    }, {})

    const current = createHistoryItem({ date: state.date })

    return { ...state, history, current }
  },

  SET_DAY() {
    const dayInHistory = state.history[createKey(action.payload)]
    return {
      ...state,
      date: action.payload,
      current: createHistoryItem(dayInHistory),
    }
  },

  SET_COUNT() {
    const { key, ...newHistoryItem } = createHistoryItem({
      ...state.history[createKey(action.data.date)],
      date: action.data.date,
      count: action.data.count
    })

    const newHistory = {
      [key]: {
        ...state.history[key],
        ...newHistoryItem,
      },
    }

    const newCurrent = state.current.date.isSame(newHistoryItem.date, 'day')
      ? { count: action.data.count }
      : {}

    return {
      ...state,
      history: { ...state.history, ...newHistory },
      current: { ...state.current, ...newCurrent },
    }
  },
})

export default createReducer(countReducer, initial)
