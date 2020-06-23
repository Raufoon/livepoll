import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '../../../../components/icon-button/IconButton'
import defaultUserIcon from './images/default-user.png'
import './style.css'

export default function UserBadge(props) {
  const {name} = props
  return (
    <IconButton 
      className='UserBadge'
      iconClass="userBadgeIcon" 
      iconUrl={defaultUserIcon}
      >{name}</IconButton>
  )
}

UserBadge.propTypes = {
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string
}
