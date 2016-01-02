import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setDay, calculate, setCount, getCount } from 'actions'

import CSS from 'css/apply'
import styles from 'css/Counter'

class Counter extends Component {
  state = {
    timeout: null,
    hoverable: true,
    click: true,
  }

  static propTypes = {
    day: PropTypes.object,
    count: PropTypes.number,
    total: PropTypes.number,
    record: PropTypes.string,
    history: PropTypes.object,
    setCount: PropTypes.func,
    getCount: PropTypes.func,
    calculate: PropTypes.func,
  }

  componentWillMount() {
    const { getCount, setDay, calculate, day } = this.props;
    getCount()
      .then(() => setDay(day))
      .then(() => calculate())
  }

  handleTap = count => event => {
    if (this.state.timeout) clearTimeout(this.state.timeout)

    this.setState({
      timeout: setTimeout(() => this.setState({click: true}), 400),
      click: false,
      hoverable: false,
    })

    event.target.className +=
    this.handleChange(count)(event)
  }

  handleClick = count => event => {
    if (this.state.click) this.handleChange(count)(event)
  }

  handleChange = count => event => {
    const { setCount, calculate, day, record } = this.props
    setCount(Math.max(count, 0) || 0, day, record) && calculate()
  }

  render() {
    const { day, count } = this.props
    return (
      <div styleName="card">
        <div styleName="title">{day.format('MMM D, YYYY')}</div>
        <div styleName="count">{count}</div>
        <div styleName="actions" ref="actions">
          <div
            className={!this.state.hoverable && '_unhoverable'}
            styleName="decrement"
            onTouchEnd={this.handleTap(count - 1)}
            onClick={this.handleClick(count - 1)}>
            –
          </div>
          <div
            className={!this.state.hoverable && '_unhoverable'}
            styleName="increment"
            onTouchEnd={this.handleTap(count + 1)}
            onClick={this.handleClick(count + 1)}>
            +
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  day: state.count.day,
  count: state.count.current.count,
  record: state.count.current.id,
  total: state.count.total,
  history: state.count.history,
}), {
  setDay,
  calculate,
  setCount,
  getCount,
})(CSS(Counter, styles))
