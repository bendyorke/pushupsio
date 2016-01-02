import React, { PropTypes, Component } from 'react'
import { initialize } from 'actions'

import CSS from 'react-css-modules'
import styles from 'css/App'

class App extends Component {
  static propTypes = {
    store: PropTypes.object,
    history: PropTypes.object,
    Routes: PropTypes.any,
  }

  componentWillMount() {
    this.props.store.dispatch(initialize())
  }

  render() {
    const { Routes, ...props } = this.props
    return  <Routes {...props} />
  }
}

export default CSS(App, styles)
