import { applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

const promiseMiddleware = store => next => action => {
  if (!action.payload || !action.payload.then) return next(action)

  const onSuccess = data => {
    store.dispatch({
      type: action.type + '_SUCCESS',
      payload: data,
    })
    return data
  }

  const onError = error => {
    setTimeout(() => { throw error }, 0)
    store.dispatch({
      type: action.type + '_ERROR',
      payload: error,
    })
    return error
  }

  const payload = new Promise((resolve, reject) => {
    action.payload.then(resolve, reject)
  })

  payload.then(onSuccess, onError)

  const chainableAction = {
    ...action,
    payload,
    then: ::payload.then,
    catch: ::payload.catch,
  }

  return next(chainableAction)
}

const parseMiddleware = store => {
  const isParseObject = _parseObj => {
    return (
      _parseObj &&
      _parseObj.className &&
      _parseObj.id &&
      _parseObj.attributes
    )
  }
  return next => action => {
    const { payload } = action

    if (!isParseObject(payload)) return next(action)

    return next({
      ...action,
      payload: { ...payload, ...payload.attributes },
    })
  }
}

const throttleMiddleware = store => next => {
  const activeThrottles = {}
  return action => {
    if (!action || !action.throttle || typeof action.payload !== 'function') return next(action)

    const duration = action.throttle
    const throttle = activeThrottles[action.type] || {}

    if (throttle.timeout) clearTimeout(throttle.timeout)
    throttle.timeout = setTimeout(() => {
      next({...action, payload: action.payload()})
    }, duration)

    activeThrottles[action.type] = throttle
    return next(action)
  }
}

export default applyMiddleware(
  thunk,
  throttleMiddleware,
  promiseMiddleware,
  parseMiddleware,
  createLogger({collapsed: true})
)
