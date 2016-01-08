import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import CSS from 'css/apply'
import styles from 'css/Today'

class Today extends Component {
  static propTypes = {
    target: PropTypes.number,
    current: PropTypes.number,
  }

  render() {
    const { target, current } = this.props
    const remaining = target - current
    if (!remaining && remaining !== 0) return
    return (
      <div styleName="card">
        {remaining > 0 &&
          <div styleName="remaining">
            <em>{remaining}</em>
            more pushup{remaining !== 1 && 's'} today!
          </div>
        }

        {remaining <= 0 &&
          <div styleName="reached">
            You did all your pushups today<br />
            Great Job!
          </div>
        }
      </div>
    )
  }
}

export default connect(state => ({
  target: Math.ceil(state.analytics.target),
  current: state.count.current.count,
}), {})(CSS(Today, styles))
