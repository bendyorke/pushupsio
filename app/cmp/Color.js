import React, { Component, PropTypes } from 'react'

import colors from 'config/colors'

import CSS from 'css/apply'
import styles from 'css/Color'

class Color extends Component {
  static propTypes = {
  }

  render() {
    const currentColor = "pirate"
    return (
      <div styleName="_card">
        <div styleName="_card_title">Color</div>
        <div styleName="colors">
          {Object.keys(colors).map(color => (
            <div
              styleName={`color ${color} ${color === currentColor && 'selected'}`}
              key={color} />
          ))}
        </div>
      </div>
    )
  }
}

export default CSS(Color, styles)
