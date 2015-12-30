import React from 'react'
import Parse from 'parse'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import Layout from 'cmp/Layout'
import Splash from 'cmp/Splash'
import SignOut from 'cmp/SignOut'
import Register from 'cmp/Register'
import Dashboard from 'cmp/Dashboard'

const auth = (next, replace) => {
  if (!Parse.User.current()) return replace(null, '/register')
}

const justify = (next, replace) => {
  if (Parse.User.current()) return replace(null, '/dashboard')
}

const Routes = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Splash} />
        <Route path="signout" component={SignOut} />
        <Route path="register" component={Register} onEnter={justify} />
        <Route path="dashboard" component={Dashboard} onEnter={auth} />
      </Route>
    </Router>
  </Provider>
)

export default Routes
