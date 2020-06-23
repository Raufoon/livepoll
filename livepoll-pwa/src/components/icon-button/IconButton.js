import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

export default function IconButton(props) {
  const {iconUrl, onClick, className, iconClass} = props

  return <button className={`IconButton ${className}`} onClick={onClick}>
    <img className={`icon ${iconClass}`} 
      src={iconUrl} 
      alt='icon related to the button'
    />
    {props.children && <label>{props.children}</label>}
  </button>
}

IconButton.propTypes = {
  iconUrl: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
}
