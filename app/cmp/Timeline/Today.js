import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setCount } from 'actions'

import Date from './Date'

import CSS from 'css/apply'
import styles from 'css/TodayTimeline'

class TodayTimeline extends Component {
  static propTypes = {
    id: PropTypes.string,
    date: PropTypes.object,
    count: PropTypes.number,
    setCount: PropTypes.func,
    total: PropTypes.object,
  }

  static defaultProps = {
    count: 0,
  }

  handleCount = count => event => {
    const { setCount, date, id } = this.props
    setCount(count, date, id)
  }

  render() {
    const { date, count, total } = this.props
    return (
      <div styleName="container">
        <Date date={date} />

        <div styleName="card">

          {/* Main Card */}
          <div styleName="main-card">
            <div styleName="count">{count}</div>
            <div styleName="label">pushups today</div>
            <div styleName="actions">

              {/* Decrement button */}
              <div
                styleName="decrement"
                onClick={this.handleCount(count - 1)}>
                –
              </div>

              <div styleName="action-seperator" />

              {/* Increment button */}
              <div
                styleName="increment"
                onClick={this.handleCount(count + 1)}>
                +
              </div>
            </div>
          </div>

          {/* Drawer */}
          <div styleName="card-drawer">
            <div styleName="drawer-value">{total.thisWeek}</div>
            <div styleName="drawer-label">this week</div>
            <div styleName="drawer-value">{total.thisMonth}</div>
            <div styleName="drawer-label">this month</div>
            <div styleName="drawer-value">{total.thisYear}</div>
            <div styleName="drawer-label">this year</div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  total: state.analytics.total,
}), {
  setCount,
})(CSS(TodayTimeline, styles))
