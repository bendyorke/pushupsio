import 'config/parse'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { syncReduxAndRouter } from 'redux-simple-router'
import history from 'config/history'
import reducers from 'reducers'
import Routes from 'config/Routes'
import App from 'config/App'
import applyMiddleware from 'config/middleware'

const store = applyMiddleware(createStore)(reducers)
syncReduxAndRouter(history, store)

render(<App store={store} history={history} Routes={Routes}/>, document.getElementById('root'))
