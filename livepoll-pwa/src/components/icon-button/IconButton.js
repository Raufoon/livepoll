import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './style.css'

export default function IconButton(props) {
  const {iconUrl, tooltip, onClick, className, iconClass, to, ...rest} = props

  let Component
  if (to) {
    Component = NavLink
  }
  else if(onClick) {
    Component = 'button'
  }
  else {
    Component='div'
  }

  return <Component to={to} className={`IconButton ${className}`} onClick={onClick} {...rest}>
    {iconUrl && <img className={`icon ${iconClass}`} 
      src={iconUrl} 
      title={tooltip}
      alt='please refresh'
    />}
    {props.children !== undefined && <label>{props.children}</label>}
  </Component>
}

IconButton.propTypes = {
  iconUrl: PropTypes.string,
  iconClass: PropTypes.string,
  tooltip: PropTypes.string
}
