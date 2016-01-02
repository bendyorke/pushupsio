import React, { Component, PropTypes } from 'react'

import Counter from 'cmp/Counter'
import Analytics from 'cmp/Analytics'
import History from 'cmp/History'

import CSS from 'react-css-modules'
import styles from 'css/Dashboard'

class Dashboard extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div>
        <Counter />
        <Analytics />
        <History />
      </div>
    )
  }
}

export default CSS(Dashboard, styles)
