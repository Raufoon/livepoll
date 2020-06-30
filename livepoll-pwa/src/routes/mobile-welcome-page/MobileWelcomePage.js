import React from 'react'
import { signInWithGoogle } from '../../services/auth'
import IconButton from '../../components/icon-button/IconButton'
import googleIcon from './images/google-icon.png'
import backgroundImage from './images/background.png'
import Responsive from '../../components/responsive/Responsive'
import './style.css'

export default function MobileWelcomePage () {
  return (
    <div className='MobileWelcomePage' style={{backgroundImage: `url(${backgroundImage})`}}>
      <header>
        <label className="appLabel">Livepoll</label>

        <IconButton 
            className="googleSigninBtn"
            iconClass="googleSigninBtnIcon" 
            onClick={signInWithGoogle}
            iconUrl={googleIcon}
          >
            SIGN IN WITH GOOGLE
          </IconButton>
      </header>

      <main>
        <div className="leftHalf">
          <p className="keyFeatureLabel">An easy way to create live polls <br/>and publish online</p>
          <p className="keyFeatureDesc">
            Livepoll is a real-time progressive web application <br/>for poll creation, participation, and sharing.
          </p>
        </div>

        <div className="rightHalf">
          &nbsp;
        </div>
      </main>

      <footer>
        This progressive web app is built with <b style={{color: 'blue'}}>
          React+Redux</b> and hosted from <b style={{color: 'orange'}}>Firebase
          </b> equipped with <b style={{color: '#fa4d57'}}>GraphQL</b> 
      </footer>
    </div>
  )
}
