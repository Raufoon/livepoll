import React from 'react';
import ModalOpenerButton from "../modal-openers/ModalOpenerButton/ModalOpenerButton";
import SignUpForm from "../forms/SignupForm/SignUpForm";
import Typography from '@material-ui/core/Typography';

import './SignUpPage.css'

const SignUpPage = (props) => {
  return (
    <div className={'signup-page-container'}>
      <div className={'signup-page-center'}>
        <Typography variant="display3" gutterBottom>Livepoll</Typography>
        <br/>
        <ModalOpenerButton
          className={'join-button'}
          ModalComponent={SignUpForm}>
          Join Us
        </ModalOpenerButton>
      </div>
    </div>
  )
};
export default SignUpPage;