import React, { Component, PropTypes } from 'react'

import CSS from 'css/apply'
import styles from 'css/Logo'

class Logo extends Component {
  static propTypes = {
    className: PropTypes.string,
    weight: PropTypes.string,
  }

  static defaultProps = {
    weight: "200",
  }

  render() {
    const { className, weight } = this.props
    return (
      <div className={className}>
        <div styleName="container">
          <div styleName={`ring ring-${weight}`} />
          <div styleName={`ring ring-${weight}`} />
          <div styleName={`ring ring-${weight}`} />
          <div styleName={`ring ring-${weight}`} />
        </div>
      </div>
    )
  }
}

export default CSS(Logo, styles)
