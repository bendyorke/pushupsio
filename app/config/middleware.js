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
    if (error.message === 'success') return onSuccess()
    setTimeout(() => { throw new Error(error && error.message || JSON.stringify(error)) }, 0)
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

const throttleMiddleware = store => next => {
  const activeThrottles = {}
  return action => {
    if (!action || !action.throttle || typeof action.payload !== 'function') return next(action)

    const duration = action.throttle
    const throttle = activeThrottles[action.type] || {}

    /**
     * If there already is a throttle action for this action,
     * remove it and create a new one.
     */
    if (throttle.timeout) clearTimeout(throttle.timeout)

    /**
     * Create a delayed action for the current action, set
     * to propogate after the throttle time.  If another action
     * comes in in the meantime, it will clear it.
     */
    throttle.timeout = setTimeout(() => {
      next({...action, payload: action.payload()})
    }, duration)
    activeThrottles[action.type] = throttle

    /**
     * Release whatever pseudo action is passed in in the meantime.
     * Pseudo action in this case means:
     * - Type is prefixed with an underscore (splat (_))
     * - Payload released is the pseudo payload: _payload
     */
    return next({
      ...action,
      type: `_${action.type}`,
      payload: action._payload || {},
    })
  }
}

var middleware = [
  thunk,
  throttleMiddleware,
  promiseMiddleware
]

if (__DEV__) {
  middleware = [
    ...middleware,
    createLogger({collapsed: true}),
  ]
}

export default applyMiddleware(...middleware)
