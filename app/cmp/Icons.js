import React, { Component, PropTypes } from 'react'

const svgs = {
  ChevronLeft: require('react-icons/lib/go/chevron-left'),
  ChevronRight: require('react-icons/lib/go/chevron-right'),
}

const Icon = Svg => props => (
  <div {...props}>
    <Svg style={{width: '100%', height: '100%'}} />
  </div>
)

module.exports = Object.keys(svgs).reduce((memo, key) => ({ ...memo, [key]: Icon(svgs[key]) }), {})
