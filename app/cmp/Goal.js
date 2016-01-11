import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateUser, saveUser, calculate } from 'actions'

import Transition from 'react-addons-css-transition-group'

import CSS from 'css/apply'
import styles from 'css/Goal'

class Goal extends Component {
  state = {
    mode: 'save',
  }

  static propTypes = {
    goal: PropTypes.number,
    dirty: PropTypes.bool,
    target: PropTypes.number,
    updateUser: PropTypes.func,
    saveUser: PropTypes.func,
    calculate: PropTypes.func,
  }

  handleChange = event => {
    this.setState({mode: 'save'})
    this.props.updateUser({goal: parseInt(event.target.value)})
    this.props.calculate()
  }

  handleSubmit = event => {
    const { saveUser } = this.props
    this.setState({mode: 'saving'})

    saveUser({
      goal: parseInt(this.refs.goal.value),
    }).then(() => {
      this.setState({mode: 'saved'})
    })
  }

  render() {
    const { goal, dirty, target } = this.props
    const { mode } = this.state
    return (
      <div styleName="_card">
        <div styleName="_card_title">Goal</div>
        <input
          styleName="input"
          type="text"
          ref="goal"
          value={goal}
          onChange={this.handleChange} />
        <div styleName="target">That's only {target} pushups a day!</div>
        <Transition
          styleName="button-container"
          transitionName={styles.fallinout}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {dirty &&
            <div
              styleName="fallinout _card_footer _hoverable"
              onClick={this.handleSubmit}
              key="save">
              {mode === 'save' && 'Save'}
              {mode === 'saving' && 'Saving...'}
              {mode === 'saved' && 'Saved!'}
            </div>
          }
        </Transition>
      </div>
    )
  }
}

export default connect(state => ({
  goal: state.user.goal,
  dirty: state.user.goal !== state.user.stored.goal,
  target: Math.ceil(state.analytics.target),
}), {
  updateUser,
  saveUser,
  calculate,
})(CSS(Goal, styles))
