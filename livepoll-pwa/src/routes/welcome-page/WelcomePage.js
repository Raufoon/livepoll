import React from 'react'
import { signInWithGoogle } from '../../services/auth'
import IconButton from '../../components/icon-button/IconButton'
import './style.css'
import googleIcon from './images/google-icon.png'
import backgroundImage from './images/background.png'

function WelcomePage () {
  return (
    <div className='WelcomePage' style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="header">
        <label className="appLabel">Livepoll</label>
        
        <nav> 
          <a className="navBtn" href="#">Features</a>
          <a className="navBtn" href="#">Downloads</a>
          <a className="navBtn" href="#">FAQ</a>
          <a className="navBtn" href="#">About us</a> 
        </nav>

        <IconButton 
          className="googleSigninBtn"
          iconClass="googleSigninBtnIcon" 
          onClick={signInWithGoogle}
          iconUrl={googleIcon}
        >
          Sign in with Google
        </IconButton>
      </div>
    </div>
  )
}

export default WelcomePage