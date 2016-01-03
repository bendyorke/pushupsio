import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Nav from 'cmp/Nav'

import CSS from 'css/apply'
import styles from 'css/Layout'

class Layout extends Component {
  static propTypes = {
    color: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const { children, color } = this.props
    return (
      <div styleName="container">
        <div className={`colorize ${color}`} style={{background: 'none'}}>
          <div styleName="content">
            <Nav />
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  color: state.user.color,
}), {})(CSS(Layout, styles))
