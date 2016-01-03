import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { DISPLAY_FORMAT } from 'utils/history'

import CSS from 'css/apply'
import styles from 'css/History'

class History extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  static defaultProps = {
    history: {},
  }

  history() {
    return Object
      .keys(this.props.history)
      .map(key => ({...this.props.history[key], key}))
      .sort((a, b) => a.date.diff(b.date))
      .reverse()
  }

  render() {
    const today = moment().startOf('day')
    return (
      <div styleName="card">
        <div styleName="title">History</div>
        {this.history().map(({id, count, date, key}) => (
          <div styleName="day" key={key}>
            <span styleName="count">{count}</span>
            <span styleName="dates">
              <div styleName="formatted">{date.format(DISPLAY_FORMAT)}</div>
              <div styleName="relative">
                {date.isSame(today, 'day') ? 'Today' :
                  moment
                    .duration(today.diff(date))
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
