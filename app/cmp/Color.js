import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateUser, saveUser } from 'actions'

import Transition from 'react-addons-css-transition-group'

import { custom as colors } from 'config/colors'

import CSS from 'css/apply'
import styles from 'css/Color'

class Color extends Component {
  state = {
    mode: 'save',
  }

  static propTypes = {
    current: PropTypes.string,
    stored: PropTypes.string,
    updateUser: PropTypes.func,
    saveUser: PropTypes.func,
  }

  static colors = Object.keys(colors)

  handleSelect = color => event => {
    this.props.updateUser({color})
  }

  handleSubmit = event => {
    const { saveUser } = this.props
    this.setState({mode: 'saving'})

    saveUser({
      color: this.state.color,
    }).then(() => {
      this.setState({mode: 'saved'})
    })
  }

  renderColor = current => color => {
    const selected = (current || this.props.current) === color
    return (
      <div
        styleName={`color ${color} ${selected && 'selected'}`}
        onClick={!selected && this.handleSelect(color)}
        key={color} />
    )
  }

  render() {
    const { dirty } = this.props
    const { color: currentColor, mode } = this.state
    return (
      <div styleName="_card">
        <div styleName="_card_title">Color</div>
        <div styleName="colors">
          {Color.colors.map(this.renderColor(currentColor))}
        </div>
        <Transition
          styleName="button-container"
          transitionName={styles.fallinout}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {dirty &&
            <div
              styleName="button fallinout"
              onClick={this.handleSubmit}
              key="save">
              {(mode === 'save' || mode === 'samesame') && 'Save'}
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
  current: state.user.color,
  dirty: state.user.color !== state.user.stored.color,
}), {
  updateUser,
  saveUser,
})(CSS(Color, styles))
