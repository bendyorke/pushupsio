import * as types from 'actions/types'
import moment from 'moment'

const initial = {
  total: 0,
  average: 0,
  target: 0,
}

export default function(state = initial, action) {
  switch(action.type) {
  case types.CALCULATE:
    const { goal, history } = action.payload
    const dayOfYear = moment().dayOfYear()
    const daysInYear = moment().endOf('year').dayOfYear()
    const today = moment()

    const total = Object.values(history)
      .filter(record => record.moment.isSame(today, 'year'))
      .reduce((memo, record) => memo + record.count, 0)
    const average = total / Math.max(dayOfYear, 1)
    const target = (goal - total) / Math.max(daysInYear - dayOfYear, 1)

    return { total, average, target }
  default:
    return state
  }
}
