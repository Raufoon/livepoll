import React from 'react'
import { signOut } from '../../services/auth'
import { NavLink } from 'react-router-dom'
import IconButton from '../icon-button/IconButton'
import signoutIcon from './images/logout.png'
import './style.css'

export default function AppSidebar(props) {
  const {className} = props

  return (
    <div className={`AppSidebar ${className}`}>
      <IconButton 
        className="signoutIconBtn"
        iconClass="signoutIcon"
        iconUrl={signoutIcon} 
        onClick={signOut}/>
    </div>
  )
}
