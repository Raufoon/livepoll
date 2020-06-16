import React, {useContext} from 'react'
import { signOut } from '../../services/auth'
import AuthContext from '../../contexts/AuthContext'

function HomePage () {
  const authUser = useContext(AuthContext)

  return (
    <div>
      Welcome home, {authUser.getName()}
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

export default HomePage