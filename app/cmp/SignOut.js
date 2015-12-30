import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { signOut } from 'actions'
import { pushPath } from 'redux-simple-router'

import CSS from 'css/apply'
import styles from 'css/SignOut'

class SignOut extends Component {
  static propTypes = {
    signOut: PropTypes.func,
    pushPath: PropTypes.func,
  }

  componentWillMount() {
    this.props.signOut()
      .then(() => this.props.pushPath('/register'))
  }

  render() {
    return (
      <div>Signing you out</div>
    )
  }
}

export default connect(state => ({
}), {
  signOut,
  pushPath,
})(CSS(SignOut, styles))
