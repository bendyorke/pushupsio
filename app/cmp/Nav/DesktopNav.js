import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Link from 'cmp/Link'
import Logo from 'cmp/Logo'
import Icons from 'cmp/Icons'

import CSS from 'css/apply'
import styles from 'css/DesktopNav'

class DesktopNav extends Component {
  static propTypes = {
    links: PropTypes.object,
    progress: PropTypes.number,
    path: PropTypes.string,
  }

  render() {
    const { links, progress, path } = this.props
    return (
      <div styleName="container">
        {/* Header */}
        <div styleName="header">
          <div styleName="title">pushups.io</div>
        </div>

        {/* Nav */}
        <div styleName="nav">
          {Object.entries(links).map(([name, to]) => (
            <Link
              styleName="link"
              to={to !== path && to}
              key={to}>
              {React.createElement(Icons[name], { styleName: "link-icon" })}
              {name}
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div styleName="footer">
          <Logo styleName="logo" />
        </div>

      </div>
    )
  }
}

export default CSS(DesktopNav, styles)
