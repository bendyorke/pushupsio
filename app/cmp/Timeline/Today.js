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
  }

  static defaultProps = {
    count: 0,
  }

  handleCount = count => event => {
    const { setCount, date, id } = this.props
    setCount(count, date, id)
  }

  render() {
    const { date, count } = this.props
    return (
      <div styleName="container">
        <Date date={date} />

        <div styleName="card">
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
      </div>
    )
  }
}

export default connect(state => ({
}), {
  setCount,
})(CSS(TodayTimeline, styles))
