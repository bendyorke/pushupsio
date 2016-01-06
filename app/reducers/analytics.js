import createReducer from 'reducers/createReducer'
import moment from 'moment'

const initial = {
  total: 0,
  average: 0,
  target: 0,
}

const analyticsReducer = (state, action) => ({
  CALCULATE() {
    const { goal, history } = action.payload
    const dayOfYear = moment().dayOfYear()
    const daysInYear = moment().endOf('year').dayOfYear()
    const today = moment()

    const total = Object.values(history)
      .filter(historyItem => historyItem.date.isSame(today, 'year'))
      .reduce((memo, historyItem) => memo + historyItem.count, 0)

    const average = total / Math.max(dayOfYear, 1)
    const target = (goal - total) / Math.max(daysInYear - dayOfYear, 1)

    return { total, average, target }
  },
})

export default createReducer(analyticsReducer, initial)
