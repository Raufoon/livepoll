import React from 'react'
import { signInWithGoogle, signInAsGuest } from '../../services/auth'
import IconButton from '../../components/icon-button/IconButton'
import googleIcon from './images/google-icon.png'
import backgroundImage from './images/background.png'
import fancyImage from './images/fancy-image.png'
import Reaktionsschnelle from 'reaktionsschnelle'
import './style.css'

function WelcomePage () {
  return (
    <div className='WelcomePage' style={{backgroundImage: `url(${backgroundImage})`}}>
      <header>
        <label className="appLabel">Livepoll</label>

        <Reaktionsschnelle minWidth={970}>
          <nav> 
            <a className="navBtn" href="#">Features</a>
            <a className="navBtn" href="#">Downloads</a>
            <a className="navBtn" href="#">FAQ</a>
            <a className="navBtn" href="#">About us</a> 
          </nav>
        </Reaktionsschnelle>

        <Reaktionsschnelle maxWidth={971}>
          <nav> 
            &nbsp;
          </nav>
        </Reaktionsschnelle>

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
            Livepoll is a real-time progressive web application built<br/> with <b style={{color: 'blue'}}> React+Redux
            </b> hosted from <b style={{color: 'orange'}}>Firebase
            </b> equipped<br/> with <b style={{color: '#fa4d57'}}>GraphQL</b> for poll creation, participation, & sharing.
          </p>
          <button className="guestSigninBtn" onClick={signInAsGuest}>Sign in as Guest</button>
        </div>

        <div className="rightHalf">
          <img className="fancyImage" alt="Welcome" src={fancyImage}/>
        </div>
      </main>
    </div>
  )
}

export default WelcomePage