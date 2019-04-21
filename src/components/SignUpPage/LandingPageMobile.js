import React from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import LandingPageFooter from "./LandingPageFooter";
import {actionSigninRequest} from "../../services/state-management/actions/auth-actions";
import {SIGNIN_METHODS} from "../../constants/auth-constants";
import Smartphone from "./desktop-landing-page-content/Smartphone";

const styles = () => ({
  appInfoCard: {
    textAlign: 'center',
    position: 'absolute',
    bottom: '10vh',
    paddingTop: 10,
    paddingBottom: 10,
    width: '100vw',
    fontFamily: 'Comfortaa',
    backgroundColor: 'rgba(6, 30, 17, 0.9)',
  },
  appBigTitle: {
    color: '#ffa500',
    fontSize: 35,
  },
  appSubtitle: {
    fontSize: 15,
    color: '#fbfbfb'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    fontSize: 'small',
    width: '100vw',
    height: '10vh',
    backgroundColor: '#fbfbfb'
  },
  smartphone: {
    width: '38vh',
    height: '73vh',
    marginLeft: '50%',
    marginTop: 10,
    transform: 'translateX(-50%)'
  },
  footerInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center'
  },
  featText: {
    fontFamily: 'Comfortaa',
  },
  featchip: {
    backgroundColor: 'transparent',
    marginTop: '10px',
    textTransform: 'uppercase',
  },
  featList: {
    marginTop: '5vh',
  }
});

const LandingPageMobile = (props) => {
  const {classes} = props;
  const signinWithGoogle = () => {
    props.dispatch(actionSigninRequest(SIGNIN_METHODS.GOOGLE))
  };
  return (
    <div className={'tac'}>
      <Smartphone className={classes.smartphone}/>

      <div className={classes.appInfoCard}>
        <h1 className={classes.appBigTitle}>Livepoll</h1>
        <h2 className={classes.appSubtitle}>Create and manage polls online.</h2>
        <h2 className={classes.appSubtitle}>Have fun!!</h2>
        <button className={`pure-button ${classes.googleButton}`} onClick={signinWithGoogle}>
          Sign in with Google
        </button>
      </div>
      <LandingPageFooter
        containerClass={classes.footer}
        innerClass={classes.footerInner}
        featureItemClass={classes.featchip}
        isForMobile={true}
      />
    </div>
  )
};

export default connect()(
  withStyles(styles)(
    LandingPageMobile
  )
);