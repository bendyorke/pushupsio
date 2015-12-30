import React, { Component, PropTypes } from 'react'

import Counter from 'cmp/Counter'

import CSS from 'react-css-modules'
import styles from 'css/Dashboard'

class Dashboard extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div>
        <Counter />
      </div>
    )
  }
}

export default CSS(Dashboard, styles)
