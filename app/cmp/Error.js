import React, { Component, PropTypes } from 'react'

import CSS from 'css/apply'
import styles from 'css/Error'

class Error extends Component {
  static propTypes = {
    error: PropTypes.any,
  }

  message() {
    const { error } = this.props
    return error.message.charAt(0).toUpperCase() + error.message.slice(1)
  }

  render() {
    return (
      <div styleName="error">{this.message()}</div>
    )
  }
}

export default CSS(Error, styles)
