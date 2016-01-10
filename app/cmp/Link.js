import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

const LinkOrAnchor = props => {
  if (props.to) return <Link {...props} />
  return <a {...props} />
}

export default LinkOrAnchor
