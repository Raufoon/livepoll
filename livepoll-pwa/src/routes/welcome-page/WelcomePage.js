import React from 'react'
import { signInWithGoogle } from '../../services/auth'

function WelcomePage () {
  return (
    <div>
      <h1>Livepoll - PWA</h1>
      <button onClick={signInWithGoogle}>Signin with Google</button>
    </div>
  )
}

export default WelcomePage