import React, { Component, PropTypes } from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { saveCount, updateCount } from 'actions'

import Icons from 'cmp/Icons'
import Date from './Date'

import CSS from 'css/apply'
import styles from 'css/PastDayTimeline'

class PastDayTimeline extends Component {
  state = {
    editing: false,
    reverseTransitionOrder: false,
  }

  static propTypes = {
    id: PropTypes.string,
    date: PropTypes.object,
    count: PropTypes.number,
    updateCount: PropTypes.func,
    saveCount: PropTypes.func,
    stored: PropTypes.object,
    animationSpeed: PropTypes.number,
  }

  static defaultProps = {
    animationSpeed: 80,
  }

  componentDidUpdate(props, {editing}) {
    /**
     * Wait until the animation is finished before
     * reversing the transition order
     */
    if (editing !== this.state.editing) {
      setTimeout(() => this.setState({
        reverseTransitionOrder: !this.state.reverseTransitionOrder,
      }), props.animationSpeed * 5)
    }
  }

  handleClick = editing => event => {
    this.setState({editing})
  }

  handleChange = count => event => {
    const { date, updateCount } = this.props
    updateCount(count, date)
  }

  handleSubmit = event => {
    const { count, date, saveCount, stored } = this.props
    if (count !== stored.count) saveCount(count, date)
    this.setState({editing: false})
  }

  render() {
    const { date, count, animationSpeed } = this.props
    const { editing, reverseTransitionOrder: reverse } = this.state

    const transitionStyles = (order, visible) => ({
      height: visible ? 16 : 0,
      visibility: visible ? 'visible' : 'hidden',
      transition: `all 0.2s ease ${(reverse ? 5 - order : order) * animationSpeed}ms`,
      opacity: visible ? 1 : 0,
    })

    return (
      <div styleName="container">
        <Date date={date} />

        <div styleName="card">
          <div styleName="count">{count}</div>
          <div styleName="transition">

            {/* View state: label, pencil */}
            <div styleName="view">
              <div
                styleName="label"
                style={transitionStyles(1, !editing)}>
                pushups
              </div>
              <Icons.Edit
                styleName="pencil"
                style={transitionStyles(0, !editing)}
                onClick={this.handleClick(true)} />
            </div>

            {/* Edit state: minus, plus, check | close */}
            <div styleName="edit" style={{visibility: editing ? 'visible' : 'hidden'}}>
              <Icons.Minus
                styleName="minus"
                style={transitionStyles(2, editing)}
                onClick={this.handleChange(count - 1)} />
              <Icons.Plus
                styleName="plus"
                style={transitionStyles(3, editing)}
                onClick={this.handleChange(count + 1)} />
              <Icons.Check
                styleName="check"
                style={transitionStyles(4, editing)}
                onClick={this.handleSubmit} />
            </div>

          </div>
        </div>

        <div styleName="star" />
      </div>
    )
  }
}

export default connect(state => ({
}), {
  saveCount,
  updateCount,
})(CSS(PastDayTimeline, styles))
