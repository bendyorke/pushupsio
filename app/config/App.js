import React, { PropTypes, Component } from 'react'
import { initialize, setDay } from 'actions'
import moment from 'moment'

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
    this.props.store.dispatch(setDay(moment()))
  }

  render() {
    const { Routes, ...props } = this.props
    return  <Routes {...props} />
  }
}

export default CSS(App, styles)
