import { isString } from 'lodash'

const CACHE_ACTION = { type: '__CACHE_REDUCER_KEYS' }

/**
 * Resolves the reducer.  Handle's aliases and expections such
 * as undefined, null, and other falsey values.
 *
 * @param  Function:Object reducers
 * @param  String          type
 * @return String         actionType
 */
const resolveReducer = (reducers, type) => {
  let reducer = reducers[type]
  if (!reducer) return undefined
  if (isString(reducer)) return resolveReducer(reducers, reducer)
  return type
}

/**
 * Caches the method look up, so as to avoid looping through every
 * possible reducer on every action
 *
 * @param  Function:Object    reducer
 * @param  {String:Any}       initial
 * @return {String:Function} {actionType: reducerFunction}
 */
const cacheReducers = (reducer, initial) => {
  const reducers = reducer(initial, { type: CACHE_ACTION })

  return Object
    .keys(reducers)
    .reduce((memo, type) => ({
      ...memo,
      [type]: resolveReducer(reducers, type),
    }), {})
}

/**
 * Takes a reducer (a function that returns a object) and
 * it's initial data and creates a redux compatible reducer.
 *
 * Some of the benefits include:
 *  - Function scope for reducer actions
 *  - Aliased methods for multiple actions
 *  - Cached method look up
 *
 * @param  Function:Object reducer
 * @param  {String:Any}    initial
 * @return Function:Any    newState
 */
const createReducer = (reducer, initial = {}) => {
  const cache = cacheReducers(reducer, initial)

  return (state = initial, action = {}) => {
    const reducers = reducer(state, action, initial)
    const key = cache[action.type]

    return key ? reducers[key](state, action) : state
  }
}

export default createReducer
