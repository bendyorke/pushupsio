import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import CSS from 'css/apply'
import styles from 'css/Analytics'

class Analytics extends Component {
  static propTypes = {
    goal: PropTypes.number,
    average: PropTypes.number,
    target: PropTypes.number,
  }

  render() {
    const { total, goal, average, target } = this.props
    return (
      <div styleName="card">
        <div styleName="title">Analytics</div>
        {!goal && (
          <div styleName="warning">
            Please add a goal in your profile to see your analytics!
          </div>
        )}

        {goal && (
          <div styleName="stats">
            <div styleName="stat">
              <span styleName="value">{goal}</span>
              <span styleName="label">Goal for this year</span>
            </div>
            <div styleName="stat">
              <span styleName="value">{Math.round(average * 10) / 10}</span>
              <span styleName="label">Daily average this year</span>
            </div>
            <div styleName="stat">
              <span styleName="value">{Math.ceil(target)}</span>
              <span styleName="label">Required daily average</span>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default connect(state => ({
  goal: state.user.goal,
  average: state.analytics.average,
  target: state.analytics.target,
}), {})(CSS(Analytics, styles))
