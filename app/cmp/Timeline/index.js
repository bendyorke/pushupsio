import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createKey } from 'utils/history'

import Today from './Today'
import PastDay from './PastDay'

import CSS from 'css/apply'
import styles from 'css/Timeline'

class Timeline extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  render() {
    const todayKey = createKey()
    const { [todayKey]: today = {}, ...history } = this.props.history
    const pastDays = Object.values(history).sort((a,b) => b.date.diff(a.date))
    return (
      <div styleName="container">
        <Today {...today} />

        {pastDays.map(day => (
          <PastDay {...day} key={day.key} />
        ))}
      </div>
    )
  }
}

export default connect(state => ({
  history: state.history,
}))(CSS(Timeline, styles))
