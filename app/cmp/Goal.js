import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateUser } from 'actions'

import Transition from 'react-addons-css-transition-group'

import CSS from 'css/apply'
import styles from 'css/Goal'

class Goal extends Component {
  state = {
    goal: null,
    mode: null,
  }

  static propTypes = {
    goal: PropTypes.number,
    updateUser: PropTypes.func,
  }

  componentDidUpdate() {
    if (this.state.mode === 'saved') this.setState({mode: null})
  }

  handleChange = key => event => {
    this.setState({
      mode: 'editing',
      [key]: event.target.value,
    })
  }

  handleSubmit = event => {
    const { updateUser } = this.props
    this.setState({mode: 'saving'})

    updateUser({
      goal: parseInt(this.refs.goal.value),
    }).then(() => {
      this.setState({mode: 'saved'})
    })
  }

  render() {
    const { goal: currentGoal } = this.props
    const { goal: newGoal, mode } = this.state
    return (
      <div styleName="_card">
        <div styleName="_card_title">Goal</div>
        <input
          styleName="input"
          type="text"
          ref="goal"
          value={mode ? newGoal : currentGoal}
          onChange={this.handleChange('goal')} />
        <Transition
          styleName="button-container"
          transitionName={styles.fallinout}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1500}>
          {mode &&
            <div
              styleName="button fallinout"
              onClick={this.handleSubmit}
              key="save">
              {mode === 'editing' && 'Save'}
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
}), {
  updateUser,
})(CSS(Goal, styles))
