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

  UPDATE_COUNT() {
    const { date, count } = action.payload
    const key = createKey(date)
    const item = createHistoryItem({
      ...state[key],
      date: date,
      count: count
    })

    return {
      ...state,
      [item.key]: item,
    }
  },

  _SET_COUNT: 'UPDATE_COUNT',

  SAVE_COUNT_SUCCESS() {
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

  SET_COUNT_SUCCESS: 'SAVE_COUNT_SUCCESS',
})

export default createReducer(historyReducer, initial)
