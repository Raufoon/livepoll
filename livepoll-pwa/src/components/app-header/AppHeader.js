import React, {useContext} from 'react'
import AuthContext from '../../contexts/AuthContext'
import { signOut } from '../../services/auth'
import { NavLink } from 'react-router-dom'

export default function AppHeader() {
  const authUser = useContext(AuthContext)

  return (
    <div style={{border: '5px solid black'}}>
      <button onClick={signOut}>Sign out</button>
      
      <NavLink to={`/user/${authUser.getUid()}`}>
        {authUser.getName()}
      </NavLink>
    </div>
  )
}
