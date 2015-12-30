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

  render() {
    const {
      user: { id },
      routing: { path },
    } = this.props

    const { returning } = this.state

    const registerPage = path === '/register'

    return (
      <div styleName="container">
        <Link styleName="link" to="/">
          <Logo styleName="logo" weight="400"/>
          <div styleName="text">pushups.io</div>
        </Link>
        <div styleName="_space" />

        {!registerPage && id &&
          <Link styleName="button" to="/dashboard">Dashboard</Link>
        }

        {!registerPage && !id &&
          <Link styleName="button" to="/register">Sign In</Link>
        }

        {registerPage &&
          <Link styleName="button" to="/">Home</Link>
        }
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user, routing: state.routing })
)(CSS(Nav, styles))
