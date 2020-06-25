import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './style.css'

export default function IconButton(props) {
  const {iconUrl, tooltip, onClick, className, iconClass, to, ...rest} = props

  let Component = 'button'
  if (to) {
    Component = NavLink
  }

  return <Component to={to} className={`IconButton ${className}`} onClick={onClick} {...rest}>
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
