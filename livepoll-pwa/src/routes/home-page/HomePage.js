import React from 'react'
import { signOut } from '../../services/auth'

function HomePage () {
  return (
    <div>
      Hello home
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

export default HomePage