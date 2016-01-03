import moment from 'moment'

export const KEY_FORMAT = 'MMDDYY'

export const DISPLAY_FORMAT = 'MMM DD, YYYY'

export function createKey(date) {
  return moment(date).format('MMDDYY')
}

export function createHistoryItem({ count = 0, id, date } = {}) {
  const serializedDay = date ? moment(date) : moment()
  const key = createKey(serializedDay)

  return { count, id, key, date: serializedDay }
}
