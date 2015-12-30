import React, { Component, PropTypes } from 'react'

import Nav from 'cmp/Nav'

import CSS from 'react-css-modules'
import styles from 'css/Layout'

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props
    return (
      <div styleName="container">
        <div styleName="content">
          <Nav />
          {children}
        </div>
      </div>
    )
  }
}

export default CSS(Layout, styles)
