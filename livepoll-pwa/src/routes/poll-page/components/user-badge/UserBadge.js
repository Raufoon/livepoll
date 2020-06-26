import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '../../../../components/icon-button/IconButton'
import defaultUserIcon from './images/default-user.png'
import './style.css'

export default function UserBadge(props) {
  const {name, avatar, className} = props
  return (
    <IconButton 
      className={`UserBadge ${className}`}
      iconClass="userBadgeIcon" 
      iconUrl={avatar || defaultUserIcon}
      >{name}</IconButton>
  )
}

UserBadge.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string
}
