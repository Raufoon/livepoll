import React, {useContext} from 'react'
import AuthContext from '../../contexts/AuthContext'
import { NavLink } from 'react-router-dom'
import IconButton from '../icon-button/IconButton'
import './style.css'

export default function AppSidebar(props) {
  const authUser = useContext(AuthContext)
  const {className} = props

  return (
    <div className={`AppHeader ${className}`}>
      <NavLink className="appTitle" to={'/'}>Livepoll</NavLink>

      <IconButton 
        className='authUserBadge'
        iconClass="authUserAvatar"
        iconUrl={authUser.getAvatarUrl()}
        to={`/user/${authUser.getUid()}`}>
        {authUser.getName()}
      </IconButton>    
    </div>
  )
}
