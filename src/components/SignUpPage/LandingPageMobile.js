import React from 'react';
import Typography from '@material-ui/core/Typography';
import JoinMobileIcon from '@material-ui/icons/PhoneAndroid';
import Loadable from 'react-loadable';
import { withStyles } from '@material-ui/core/styles';

import ModalOpenerButton from "../utils/modal-openers/ModalOpenerButton/ModalOpenerButton";
import LPLoader from "../loaders/LPLoader";

const SignUpForm = Loadable({
  loader: ()=>import('../forms/SignupForm/SignUpForm'),
  loading: LPLoader,
});

const styles = theme => ({
  appInfoCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    position: 'absolute',
    top: '70vh',
    paddingTop: 10,
    paddingBottom: 10,
    width: '100vw',
    transform: 'translateY(-50%)',
  },
  appBigTitle: {
    color: '#fbfbfb',
  },
  appSubtitle: {
    color: '#fbfbfb',
  },
  joinButton: {
    color: '#fbfbfb',
  }
});

const LandingPageMobile = (props) => {
  const {classes} = props;
  return (
    <React.Fragment>
      <div className={classes.appInfoCard}>
        <Typography
          variant="h3"
          className={classes.appBigTitle}
          gutterBottom>Livepoll
        </Typography>
        <Typography
          variant="body1"
          className={classes.appSubtitle}
          gutterBottom>
          Create and manage polls online. Have fun!
        </Typography>
        <br/>
        <ModalOpenerButton
          className={classes.joinButton}
          OpenerIcon={JoinMobileIcon}
          ModalComponent={SignUpForm}>
          Join Us
        </ModalOpenerButton>
      </div>
    </React.Fragment>
  )
};
export default withStyles(styles)(LandingPageMobile);