import React from 'react'
import { signInWithGoogle, signInAsGuest } from '../../services/auth'
import IconButton from '../../components/icon-button/IconButton'
import googleIcon from './images/google-icon.png'
import backgroundImage from './images/background.png'
import './style.css'

export default function MobileWelcomePage () {
  return (
    <div className='MobileWelcomePage' style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="content">
        <label className="appLabel">Livepoll</label>
        
        <div style={{flexGrow: 1}}>&nbsp;</div>

        <p className="keyFeatureLabel">An easy way to create live polls & publish online</p>
        <p className="keyFeatureDesc">
          Livepoll is a real-time progressive web application built with <b style={{color: 'blue'}}> React+Redux
          </b> hosted from <b style={{color: 'orange'}}>Firebase
          </b> equipped with <b style={{color: '#fa4d57'}}>GraphQL</b> for poll creation, participation, & sharing.
        </p>

        <IconButton 
          className="googleSigninBtn"
          iconClass="googleSigninBtnIcon" 
          onClick={signInWithGoogle}
          iconUrl={googleIcon}>
              JOIN WITH GOOGLE
        </IconButton>

        <button className="guestSigninBtn" onClick={signInAsGuest}>Sign in as Guest</button>
      </div>
    </div>
  )
}
