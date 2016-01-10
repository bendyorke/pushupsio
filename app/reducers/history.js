import createReducer from 'reducers/createReducer'
import moment from 'moment'
import { createKey, createHistoryItem } from 'utils/history'

const initial = {}

const historyReducer = (state, action) => ({
  INITIALIZE() {
    const records = action.payload.records || []

    const history = records.reduce((memo, record) => {
      let item = createHistoryItem({
        ...record,
        ...record.attributes,
        stored: {...record, ...record.attributes},
      })

      return { ...memo, [item.key]: item }
    }, {})

    return history
  },

  SET_COUNT() {
    const key = createKey(action.data.date)
    const item = createHistoryItem({
      ...state[key],
      date: action.data.date,
      count: action.data.count
    })

    return {
      ...state,
      [item.key]: item,
    }
  },

  SET_COUNT_SUCCESS() {
    const record = {...action.payload, ...action.payload.attributes}
    const item = createHistoryItem({
      ...record,
      stored: {...record}
    })

    return {
      ...state,
      [item.key]: item,
    }
  },
})

export default createReducer(historyReducer, initial)
