import React, {useContext} from 'react'
import AuthContext from '../../contexts/AuthContext'
import { signOut } from '../../services/auth'
import { NavLink } from 'react-router-dom'

export default function AppSidebar(props) {
  const authUser = useContext(AuthContext)
  const {className} = props

  return (
    <div className={className}>
      <button onClick={signOut}>Sign out</button>

      <NavLink to={'/'}>Livepoll</NavLink>
      
      <NavLink to={`/user/${authUser.getUid()}`}>
        {authUser.getName()}
      </NavLink>

      <NavLink to={'/create'}>Create Poll</NavLink>
    </div>
  )
}
