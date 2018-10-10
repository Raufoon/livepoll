import React from 'react';
import Typography from '@material-ui/core/Typography';
import MediaQuery from 'react-responsive';
import JoinDesktopIcon from '@material-ui/icons/Computer';
import JoinMobileIcon from '@material-ui/icons/PhoneAndroid';
import Loadable from 'react-loadable';

import ModalOpenerButton from "../utils/modal-openers/ModalOpenerButton/ModalOpenerButton";

const SignUpForm = Loadable({
  loader: ()=>import('../forms/SignupForm/SignUpForm'),
  loading: ()=>'',
});

const SignUpPage = (props) => {
  return (
    <div className={'signup-page-container'}>
      <div className={'signup-page-center'}>
        <Typography variant="h2" className={'app-big-title'} gutterBottom>Livepoll</Typography>
        <br/>
        <MediaQuery minWidth={800}>
          <ModalOpenerButton
            className={'join-button'}
            OpenerIcon={JoinDesktopIcon}
            ModalComponent={SignUpForm}>
            Join Us
          </ModalOpenerButton>
        </MediaQuery>
        <MediaQuery maxWidth={799}>
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