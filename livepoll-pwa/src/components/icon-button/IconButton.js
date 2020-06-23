import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { NavLink } from 'react-router-dom'

export default function IconButton(props) {
  const {iconUrl, tooltip, onClick, className, iconClass, to} = props

  let Component = 'button'
  if (to) {
    Component = NavLink
  }

  return <Component to={to} className={`IconButton ${className}`} onClick={onClick}>
    <img className={`icon ${iconClass}`} 
      src={iconUrl} 
      title={tooltip}
      alt='icon related to the button'
    />
    {props.children && <label>{props.children}</label>}
  </Component>
}

IconButton.propTypes = {
  iconUrl: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
  tooltip: PropTypes.string
}
