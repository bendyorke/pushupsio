import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Transition from 'react-addons-css-transition-group'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'

import CSS from 'css/apply'
import styles from 'css/Nav'

class Nav extends Component {
  static propTypes = {
    path: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const links = {
      'Timeline': '/timeline',
      'Analytics': '/analytics',
      'Profile': '/profile',
    }
    const progress = 14
    return (
      <div styleName="container">

        <MobileNav
          links={links}
          progress={progress}
          path={this.props.path} />

        <DesktopNav
          links={links}
          progress={progress}
          path={this.props.path} />

        <div styleName="content">
          {this.props.children}
        </div>

      </div>
    )
  }
}

export default connect(state => ({
  path: state.routing.path,
}))(CSS(Nav, styles))
