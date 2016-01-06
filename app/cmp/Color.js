import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateColor, updateUser } from 'actions'

import Transition from 'react-addons-css-transition-group'

import { custom as colors } from 'config/colors'

import CSS from 'css/apply'
import styles from 'css/Color'

class Color extends Component {
  state = {
    color: null,
    mode: null,
  }

  static propTypes = {
    current: PropTypes.string,
    stored: PropTypes.string,
    updateUser: PropTypes.func,
    updateColor: PropTypes.func,
  }

  static colors = Object.keys(colors)

  componentDidUpdate() {
    const { mode } = this.state
    if (mode === 'samesame') this.cancel()
    if (mode === 'saved') setTimeout(this.cancel, 1200)
  }

  cancel = () => {
    this.setState({mode: null})
  }

  handleSelect = color => event => {
    this.props.updateColor(color)
    if (color === this.props.stored) {
      this.setState({ mode: 'samesame', color: null })
    } else {
      this.setState({ mode: 'editing', color })
    }
  }

  handleSubmit = event => {
    const { updateUser } = this.props
    this.setState({mode: 'saving'})

    updateUser({
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
    const { mode, color } = this.state;
    return (
      <div styleName="_card">
        <div styleName="_card_title">Color</div>
        <div styleName="colors">
          {Color.colors.map(this.renderColor(color))}
        </div>
        <Transition
          styleName="button-container"
          transitionName={styles.fallinout}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {mode &&
            <div
              styleName="button fallinout"
              onClick={this.handleSubmit}
              key="save">
              {(mode === 'editing' || mode === 'samesame') && 'Save'}
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
  stored: state.user.stored.color,
}), {
  updateColor,
  updateUser,
})(CSS(Color, styles))
