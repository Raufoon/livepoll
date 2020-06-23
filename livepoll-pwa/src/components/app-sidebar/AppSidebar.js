import React from 'react'
import { signOut } from '../../services/auth'
import IconButton from '../icon-button/IconButton'
import signoutIcon from './images/logout.png'
import createPollIcon from './images/create-poll.png'
import homeIcon from './images/home.png'
import './style.css'

export default function AppSidebar(props) {
  const {className} = props

  return (
    <div className={`AppSidebar ${className}`}>
      <IconButton 
        to={'/'}
        className="iconBtn"
        iconClass="icon"
        iconUrl={homeIcon}
        tooltip="Home"/>
      
      <IconButton 
        to={'/create'}
        className="iconBtn"
        iconClass="icon"
        iconUrl={createPollIcon}
        tooltip="Create Poll"/>

      <IconButton 
        className="iconBtn"
        iconClass="icon"
        iconUrl={signoutIcon}
        tooltip="Sign out" 
        onClick={signOut}/>
    </div>
  )
}
