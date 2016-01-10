import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Link from 'cmp/Link'
import Logo from 'cmp/Logo'

import CSS from 'css/apply'
import styles from 'css/MobileNav'

class MobileNav extends Component {
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
        <div styleName="top-bar">
          <span styleName="title">pushups.io</span>
        </div>

        {/* Nav */}
        <div styleName="bottom-bar">
          {Object.entries(links).map(([name, to]) => (
            <Link
              styleName="link"
              to={to !== path && to}
              key={to}>
              {name}
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default CSS(MobileNav, styles)
