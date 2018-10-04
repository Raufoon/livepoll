import React from 'react';
import ModalOpenerButton from "../modal-openers/ModalOpenerButton/ModalOpenerButton";
import SignUpForm from "../forms/SignupForm/SignUpForm";
import Typography from '@material-ui/core/Typography';
import MediaQuery from 'react-responsive';
import JoinDesktopIcon from '@material-ui/icons/Computer';
import JoinMobileIcon from '@material-ui/icons/PhoneAndroid';

import './SignUpPage.css'

const SignUpPage = (props) => {
  return (
    <div className={'signup-page-container'}>
      <div className={'signup-page-center'}>
        <Typography variant="display3" className={'app-big-title'} gutterBottom>Livepoll</Typography>
        <br/>
        <MediaQuery orientation={'landscape'}>
          <ModalOpenerButton
            className={'join-button'}
            OpenerIcon={JoinDesktopIcon}
            ModalComponent={SignUpForm}>
            Join Us
          </ModalOpenerButton>
        </MediaQuery>
        <MediaQuery orientation={'portrait'}>
          <ModalOpenerButton
            className={'join-button'}
            OpenerIcon={JoinMobileIcon}
            ModalComponent={SignUpForm}>
            Join Us
          </ModalOpenerButton>
        </MediaQuery>
      </div>
    </div>
  )
};
export default SignUpPage;