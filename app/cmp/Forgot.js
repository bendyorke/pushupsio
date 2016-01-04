import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { resetPassword } from 'actions'

import CSS from 'css/apply'
import styles from 'css/Forgot'

class Forgot extends Component {
  state = {
    details: "Enter your email and we'll send you instruction on how to reset your password",
  }

  static propTypes = {
    resetPassword: PropTypes.func,
  }

  submit = () => {
    this.props.resetPassword(this.refs.email.value)
    .then(this.setState({ sent: true }))
  }

  render() {
    return (
      <div styleName="_content">
        <div styleName="_card">
          <div styleName="_card_title">Reset password</div>
          <div styleName="details">
            {this.state.sent && (
              <span>Great!  Check your email for further instructions, or <br /><Link to="/signin">click here to sign in</Link></span>
            )}

            {!this.state.sent && (
              <span>Enter your email below and we'll send you a link where you can reset your password</span>
            )}
          </div>
          <input
            styleName="input"
            ref="email"
            placeholder="email@pushups.io" />
          <div
            styleName="button"
            onClick={this.submit}>
            Send
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({

}), {
  resetPassword,
})(CSS(Forgot, styles))
