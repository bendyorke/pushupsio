import React, { Component, PropTypes } from 'react'

import CSS from 'css/apply'
import styles from 'css/Feature'

class Feature extends Component {
  static propTypes = {
    number: PropTypes.number,
    title: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func,
  }

  render() {
    const { active, number, onClick, title, children } = this.props
    return (
      <div styleName={`feature ${active && 'active'}`} onClick={onClick(number)}>
        <div styleName="title">{title}</div>
        <div styleName="description">{children}</div>
      </div>
    )
  }
}

export default CSS(Feature, styles)
