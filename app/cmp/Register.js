import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { signIn, signUp, initialize } from 'actions'
import { pushPath } from 'redux-simple-router'
import { Link } from 'react-router'

import Icons from 'cmp/Icons'
import Error from 'cmp/Error'

import CSS from 'css/apply'
import styles from 'css/Register'

class Register extends Component {
  static propTypes = {
    signIn: PropTypes.func,
    signUp: PropTypes.func,
    pushPath: PropTypes.func,
    path: PropTypes.string,
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

  signIn = event => {
    event.preventDefault()
    const { email, password } = this.state
    this.props.signIn(email, password)
      .then(::this.success, ::this.err)
  }

  signUp = event => {
    event.preventDefault()
    const { email, password } = this.state
    this.props.signUp(email, password)
      .then(::this.success, ::this.err)
  }

  render() {
    const { path } = this.props
    return (
      <div styleName="_content">
        <div styleName="card">
          <div styleName="title">{ path === '/signin' ? 'Sign In' : 'Register' }</div>
          <form styleName="content" onSubmit={path === '/signin' ? this.signIn : this.signUp}>
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

            {path === '/signin' && (
              <div styleName="actions">
                <input
                  type="submit"
                  styleName="sign-in"
                  value="Sign In" />
                Or <Link to="/register" styleName="switch">click here to sign up</Link>
                <Link to="/forgot" styleName="forgot-password">Forgot your password?</Link>
              </div>
            )}

            {path === '/register' && (
              <div styleName="actions">
                <input
                  type="submit"
                  styleName="sign-up"
                  value="Sign Up" />
                Or <Link to="/signin" styleName="switch">click here to sign in</Link>
              </div>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  path: state.routing.path,
}), {
  signIn,
  signUp,
  pushPath,
  initialize,
})(CSS(Register, styles))
