import React, { Component, PropTypes } from 'react'

import Icons from 'cmp/Icons'
import Date from './Date'

import CSS from 'css/apply'
import styles from 'css/PastDayTimeline'

class PastDayTimeline extends Component {
  static propTypes = {
    date: PropTypes.object,
    count: PropTypes.number,
  }

  render() {
    const { date, count } = this.props
    return (
      <div styleName="container">
        <Date date={date} />

        <div styleName="card">
          <div styleName="count">{count}</div>
          <div styleName="label">pushups</div>
          <Icons.Edit styleName="edit" />
        </div>

        <div styleName="star" />
      </div>
    )
  }
}

export default CSS(PastDayTimeline, styles)
