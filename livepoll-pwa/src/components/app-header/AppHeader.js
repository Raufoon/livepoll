import React, {useContext} from 'react'
import AuthContext from '../../contexts/AuthContext'
import { signOut } from '../../services/auth'
import { NavLink } from 'react-router-dom'

export default function AppHeader() {
  const authUser = useContext(AuthContext)

  return (
    <div style={{border: '5px solid black'}}>
      <button onClick={signOut}>Sign out</button>

      <NavLink to={'/'}>Livepoll</NavLink>
      
      <NavLink to={`/user/${authUser.getUid()}`}>
        {authUser.getName()}
      </NavLink>

      <NavLink to={'/create'}>Create Poll</NavLink>
    </div>
  )
}
