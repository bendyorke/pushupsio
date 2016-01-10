import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import CSS from 'css/apply'
import styles from 'css/TimelineDate'

class TimelineDate extends Component {
  static propTypes = {
    date: PropTypes.object,
  }

  static defaultProps = {
    date: moment(),
  }

  render() {
    const { date } = this.props
    const month = date.format('MMM')
    const day = date.date()
    return (
      <div styleName="container">
        <div styleName="month">{month}</div>
        <div styleName="day">{day}</div>
      </div>
    )
  }
}

export default CSS(TimelineDate, styles)
