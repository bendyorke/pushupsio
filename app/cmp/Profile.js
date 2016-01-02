import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import Account from 'cmp/Account'
import Goal from 'cmp/Goal'
import Color from 'cmp/Color'

import CSS from 'css/apply'
import styles from 'css/Profile'

class Profile extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div>
        <Account />
        <Goal />
        <Color />
        <Link styleName="signout" to="/signout">Sign Out</Link>
      </div>
    )
  }
}

export default CSS(Profile, styles)
