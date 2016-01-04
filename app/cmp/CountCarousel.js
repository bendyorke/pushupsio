import React, { Component, PropTypes } from 'react'

import CSS from 'css/apply'
import styles from 'css/CountCarousel'

const CountCarousel = () => (
  <div styleName="container">
    <div styleName="all-counts">
      <div styleName="count">1000</div>
      <div styleName="count">10000</div>
      <div styleName="count">20000</div>
      <div styleName="count">50000</div>
    </div>
  </div>
)

export default CSS(CountCarousel, styles)
