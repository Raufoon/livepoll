import React, {useContext} from 'react'
import AuthContext from '../../contexts/AuthContext'
import { NavLink } from 'react-router-dom'
import IconButton from '../icon-button/IconButton'
import './style.css'

export default function AppHeader(props) {
  const authUser = useContext(AuthContext)
  const {className} = props

  return (
    <div className={`AppHeader ${className}`}>
      <div className="appTitle">
        <NavLink to={'/'}>LIVEPOLL</NavLink>
      </div>

      <IconButton 
        className='authUserBadge'
        iconClass="authUserAvatar"
        iconUrl={authUser.getAvatarUrl() || 'https://en.meming.world/images/en/thumb/6/68/Tom_Cat_Reading_a_Newspaper.jpg/300px-Tom_Cat_Reading_a_Newspaper.jpg'}
        to={`/user/${authUser.getUid()}`}>
        {authUser.getName() || 'Guest User'}
      </IconButton>    
    </div>
  )
}
