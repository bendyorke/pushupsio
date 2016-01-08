import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Logo from 'cmp/Logo'

import CSS from 'css/apply'
import styles from 'css/Nav'

class Nav extends Component {
  static propTypes = {
    user: PropTypes.object,
    routing: PropTypes.object,
  }

  static defaultProps = {
    user: {},
  }

  state = {
    returning: false,
  }

  button() {
    const {
      user: { id },
      routing: { path },
    } = this.props

    switch(path) {
    case '/register':
    case '/signin':
      return ['/', 'Home']
    case '/dashboard':
      return ['/profile', 'Profile']
    default:
      return id ? ['/dashboard', 'Dashboard'] : ['/signin', 'Sign In']
    }
  }

  render() {
    const [path, text] = this.button()
    return (
      <div styleName="container">
        <div styleName="content">
          <Link styleName="link" to="/">
            <Logo styleName="logo" weight="400" color={this.props.user.color}/>
            <div styleName="text">pushups.io</div>
          </Link>
          <div styleName="_space" />
          <Link styleName="button" to={path}>{text}</Link>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  user: state.user,
  routing: state.routing,
}), {})(CSS(Nav, styles))
