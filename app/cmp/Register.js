import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { signIn, signUp, initialize } from 'actions'
import { pushPath } from 'redux-simple-router'
import Icons from 'cmp/Icons'

import Error from 'cmp/Error'

import CSS from 'css/apply'
import styles from 'css/Register'

class Register extends Component {
  static propTypes = {
    signIn: PropTypes.func,
    signUp: PropTypes.func,
    pushPath: PropTypes.func,
  }

  state = {
    email: '',
    password: '',
    error: null,
  }

  success() {
    const { pushPath, initialize } = this.props
    initialize()
    pushPath('/dashboard')
  }

  err(error) {
    this.setState({error})
  }

  update = event => {
    const { email, password } = this.refs
    this.setState({
      email: email.value,
      password: password.value,
    })
  }

  signIn = () => {
    const { email, password } = this.state
    this.props.signIn(email, password)
      .then(::this.success, ::this.err)
  }

  signUp = () => {
    const { email, password } = this.state
    this.props.signUp(email, password)
      .then(::this.success, ::this.err)
  }

  render() {
    return (
      <div styleName="_content">
        <div styleName="card">
          <div styleName="title">Register</div>
          <div styleName="content">
            {this.state.error && <Error error={this.state.error} />}
            <div styleName="_field">
              <input
                styleName="email"
                ref="email"
                placeholder="email"
                onChange={this.update} />
              <Icons.Mail styleName="_input_icon" />
            </div>
            <div styleName="_field">
              <input
                styleName="password"
                ref="password"
                type="password"
                placeholder="••••••••"
                onChange={this.update} />
              <Icons.Key styleName="_input_icon" />
            </div>

            <div styleName="actions">
              <div styleName="sign-in" onClick={this.signIn}>Sign In</div>
              <div styleName="sign-up" onClick={this.signUp}>Sign Up</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
}), {
  signIn,
  signUp,
  pushPath,
  initialize,
})(CSS(Register, styles))
