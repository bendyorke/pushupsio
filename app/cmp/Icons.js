import React, { Component, PropTypes } from 'react'

const svgs = {
  ChevronLeft: require('react-icons/lib/go/chevron-left'),
  ChevronRight: require('react-icons/lib/go/chevron-right'),
  ChevronDown: require('react-icons/lib/go/chevron-down'),
  Plus: require('react-icons/lib/go/plus'),
  Minus: require('react-icons/lib/go/dash'),
  Mail: require('react-icons/lib/go/mail'),
  Key: require('react-icons/lib/go/key'),
  Timeline: require('react-icons/lib/go/list-unordered'),
  Analytics: require('react-icons/lib/go/graph'),
  Profile: require('react-icons/lib/go/jersey'),
  Edit: require('react-icons/lib/go/pencil'),
  Check: require('react-icons/lib/go/check'),
  Close: require('react-icons/lib/go/x'),
}

const Icon = Svg => props => (
  <div {...props}>
    <Svg style={{width: '100%', height: '100%'}} />
  </div>
)

module.exports = Object.keys(svgs).reduce((memo, key) => ({ ...memo, [key]: Icon(svgs[key]) }), {})
