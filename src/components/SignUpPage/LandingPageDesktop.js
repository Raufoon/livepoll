import React from 'react';
import Typography from '@material-ui/core/Typography';
import JoinDesktopIcon from '@material-ui/icons/Computer';
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
    position: 'absolute',
    top: '20vh',
    transform: 'translateY(-50%)',
    left: 60,
  },
  appBigTitle: {
    color: '#fbfbfb',
    textShadow: '-1px 0 #007b6a, 0 1px #007b6a, 1px 0 #007b6a, 0 -1px #007b6a'
  },
  appSubtitle: {
    color: '#fbfbfb',
  },
  joinButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#fbfbfb',
  }
});

const LandingPageDesktop = (props) => {
  const {classes} = props;
  return (
    <React.Fragment>
      <div className={classes.appInfoCard}>
        <Typography
          variant="h1"
          className={classes.appBigTitle}
          gutterBottom>Livepoll
        </Typography>
        <Typography
          variant="h5"
          className={classes.appSubtitle}
          gutterBottom>
          Create and manage polls online. Have fun!
        </Typography>
      </div>
      <ModalOpenerButton
        className={classes.joinButton}
        OpenerIcon={JoinDesktopIcon}
        ModalComponent={SignUpForm}>
        Join Us
      </ModalOpenerButton>
    </React.Fragment>
  )
};
export default withStyles(styles)(LandingPageDesktop);