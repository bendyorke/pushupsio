import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import CSS from 'css/apply'
import styles from 'css/Splash'

class Splash extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div styleName="container">
        <div styleName="title">Count your pushups throughout the year</div>
        <div styleName="subtitle">Set a goal. Track your progress. Push yourself.</div>
        <Link styleName="sign-up" to="/register">Sign up</Link>
      </div>
    )
  }
}

export default CSS(Splash, styles)
