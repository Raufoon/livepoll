import React from 'react';
import Typography from '@material-ui/core/Typography';
import MediaQuery from 'react-responsive';
import JoinDesktopIcon from '@material-ui/icons/Computer';
import JoinMobileIcon from '@material-ui/icons/PhoneAndroid';
import Loadable from 'react-loadable';

import './SignUpPage.css'
import ModalOpenerButton from "../utils/modal-openers/ModalOpenerButton/ModalOpenerButton";

const SignUpForm = Loadable({
  loader: ()=>import('../forms/SignupForm/SignUpForm'),
  loading: ()=>'',
});

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