import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateUser, saveUser, calculate } from 'actions'

import Transition from 'react-addons-css-transition-group'

import CSS from 'css/apply'
import styles from 'css/Account'

class Account extends Component {
  state = {
    mode: 'save',
  }

  static propTypes = {
    email: PropTypes.string,
    dirty: PropTypes.bool,
    updateUser: PropTypes.func,
    updateEmail: PropTypes.func,
  }

  handleChange = event => {
    this.setState({mode: 'save'})
    this.props.updateUser({email: event.target.value})
  }

  handleSubmit = event => {
    const { saveUser } = this.props
    this.setState({mode: 'saving'})

    saveUser({
      email: this.refs.email.value,
    }).then(() => {
      this.setState({mode: 'saved'})
    })
  }

  render() {
    const { email, dirty } = this.props
    const { mode } = this.state
    return (
      <div styleName="_card">
        <div styleName="_card_title">Account</div>
        <input
          styleName="input"
          type="email"
          ref="email"
          value={email}
          onChange={this.handleChange} />
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
  email: state.user.email,
  dirty: state.user.email !== state.user.stored.email,
}), {
  updateUser,
  saveUser,
})(CSS(Account, styles))
