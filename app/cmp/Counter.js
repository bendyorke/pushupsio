import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setDay, calculate, setCount } from 'actions'
import moment from 'moment'
import Icons from 'cmp/Icons'

import CSS from 'css/apply'
import styles from 'css/Counter'

class Counter extends Component {
  state = {
    timeout: null,
    hoverable: true,
    click: true,
  }

  static propTypes = {
    date: PropTypes.object,
    count: PropTypes.number,
    total: PropTypes.number,
    record: PropTypes.string,
    history: PropTypes.object,
    setCount: PropTypes.func,
    calculate: PropTypes.func,
  }

  static defaultProps = {
    date: moment(),
    count: 0,
  }

  handleTap = count => event => {
    if (this.state.timeout) clearTimeout(this.state.timeout)

    this.setState({
      timeout: setTimeout(() => this.setState({click: true}), 400),
      click: false,
      hoverable: false,
    })

    this.handleChange(count)(event)
  }

  handleClick = count => event => {
    if (this.state.click) this.handleCountChange(count)(event)
  }

  handleCountChange = count => event => {
    const { setCount, calculate, date, record } = this.props
    setCount(Math.max(count, 0) || 0, date, record) && calculate()
  }

  handleDayChange = date => event => {
    if (date.isBetween(
      moment().subtract(1, 'year').endOf('year'),
      moment().add(1, 'day').startOf('day')
    )) this.props.setDay(date)
  }

  render() {
    const { date, count } = this.props
    return (
      <div styleName="card">
        <div styleName="title">
          <Icons.ChevronLeft
            styleName="left"
            onClick={this.handleDayChange(moment(date).subtract(1, 'day'))}/>
          <div styleName="date">{date.format('MMM D, YYYY')}</div>
          <Icons.ChevronRight styleName="right" onClick={this.handleDayChange(moment(date).add(1, 'day'))} />
        </div>
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
  date: state.count.date,
  count: state.count.current.count,
  record: state.count.current.id,
  total: state.count.total,
  history: state.count.history,
}), {
  setDay,
  calculate,
  setCount,
})(CSS(Counter, styles))
