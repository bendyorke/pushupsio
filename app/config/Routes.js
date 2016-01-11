import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import Layout from 'cmp/Layout'
import Splash from 'cmp/Splash'
import Forgot from 'cmp/Forgot'
import SignOut from 'cmp/SignOut'
import Profile from 'cmp/Profile'
import Register from 'cmp/Register'
import Timeline from 'cmp/Timeline'
import Analytics from 'cmp/Analytics'

const auth = (next, replace) => {
  if (!Parse.User.current()) return replace(null, '/signin')
}

const justify = (next, replace) => {
  if (Parse.User.current()) return replace(null, '/timeline')
}

const Routes = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={Splash} onEnter={justify} />
        <Route path="home" component={Splash} />
        <Route path="signout" component={SignOut} />
        <Route path="signin" component={Register} onEnter={justify} />
        <Route path="register" component={Register} onEnter={justify} />
        <Route path="forgot" component={Forgot} />
      </Route>
      <Route path="/" component={Layout}>
        <Route path="timeline" component={Timeline} onEnter={auth} />
        <Route path="analytics" component={Analytics} onEnter={auth} />
        <Route path="profile" component={Profile} onEnter={auth} />
      </Route>
    </Router>
  </Provider>
)

export default Routes
