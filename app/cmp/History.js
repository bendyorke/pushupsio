import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import CSS from 'css/apply'
import styles from 'css/History'

class History extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  history() {
    return Object
      .values(this.props.history)
      .sort()
      .reverse()
  }

  render() {
    const today = moment().startOf('day')
    return (
      <div styleName="card">
        <div styleName="title">History</div>
        {this.history().map(({id, count, moment: day}) => (
          <div styleName="day" key={id}>
            <span styleName="count">{count}</span>
            <span styleName="dates">
              <div styleName="formatted">{day.format('MMM DD, YYYY')}</div>
              <div styleName="relative">
                {day.isSame(today, 'day') ? 'Today' :
                  moment
                    .duration(today.diff(day))
                    .humanize() + ' ago'
                }
              </div>
            </span>
          </div>
        ))}
      </div>
    )
  }
}

export default connect(state => ({
  history: state.count.history,
}), {})(CSS(History, styles))
