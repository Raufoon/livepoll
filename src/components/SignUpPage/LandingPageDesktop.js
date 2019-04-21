import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';

import Smartphone from "./desktop-landing-page-content/Smartphone";
import ImageButton from "../ImageButton";
import {STAR_URL} from "../../constants/livepoll-constants";
import {actionSigninRequest} from "../../services/state-management/actions/auth-actions";
import {SIGNIN_METHODS} from "../../constants/auth-constants";
import LandingPageFooter from "./LandingPageFooter";

const styles = () => ({
  appInfoCard: {
    position: 'absolute',
    top: '10vh',
    left: 60,
    fontFamily: 'Comfortaa',
  },
  appBigTitle: {
    color: '#ffa500',
    fontSize: '4em',
  },
  appSubtitle: {
    color: '#202624'
  },
  smartphone: {
    position: 'absolute',
    left: '70vw',
    top: '50vh',
    width: '38vh',
    height: '73vh',
    transform: 'translateX(-50%) translateY(-50%)'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100vw',
    height: '10vh',
    backgroundColor: '#fbfbfb'
  },
  footerInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center'
  },
  featText: {
    fontFamily: 'Comfortaa',
    padding: 10,
  },
  featchip: {
    margin: '10px',
    backgroundColor: 'transparent',
    marginTop: '10px',
    fontWeight: 'bold'
  },
  googleButton: {
    float: 'right',
    margin: 10,
    fontFamily: 'Comfortaa',
    backgroundColor: 'white',
  }
});

const featureList = [
  'Create polls with texts',
  'Manage profile easily',
  'Get poll updates in real-time',
  'Create polls with images & videos (coming soon)',
];

const LandingPageDesktop = (props) => {
  const {classes} = props;

  const signinWithGoogle = () => {
    props.dispatch(actionSigninRequest(SIGNIN_METHODS.GOOGLE))
  };

  return (
    <React.Fragment>
      <div className={classes.appInfoCard}>
        <h1 className={classes.appBigTitle}>Livepoll</h1>
        <h2 className={classes.appSubtitle}>Create and manage polls online. Have fun!</h2>
        <br/><br/>
        <ul className="pure-menu-list">
          {
            featureList.map(feat => (
              <li key={feat} className={`pure-menu-item ${classes.featText}`}>
                <ImageButton src={STAR_URL} text={feat}/>
              </li>
            ))
          }
        </ul>
      </div>

      <button className={`pure-button ${classes.googleButton}`} onClick={signinWithGoogle}>
        Sign in with Google
      </button>

      <Smartphone className={classes.smartphone}/>
      <LandingPageFooter containerClass={classes.footer} innerClass={classes.footerInner} featureItemClass={classes.featchip}/>
    </React.Fragment>
  )
};

export default connect()(withStyles(styles)(
  LandingPageDesktop
));