import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography/Typography";

import './SignUpForm.css'
import LPForm from "../LPForm/LPForm";
import LPFormField from "../form-fields/LPFormField/LPFormField";
import {actionSigninRequest} from "../../../state-management/actions/auth-actions";
import {SIGNIN_METHODS} from "../../../constants/auth-constants";

const SignUpForm = (props) => {
  const signinWithGoogle = () => {
    props.dispatch(actionSigninRequest(SIGNIN_METHODS.GOOGLE))
  };
  const signinWithEmailPass = (data) => {
    props.dispatch(actionSigninRequest(SIGNIN_METHODS.EMAIL_PASS, data));
  };
  return (
    <div className={'tac'}>
      <Typography variant="headline" gutterBottom>Join our community</Typography>
      <LPForm submitButtonLabel={'Log In'} onSubmit={signinWithEmailPass}>
        {
          LPFormField.createRequiredField({
            name: 'email',
            label: 'email or phone',
            type: 'email'
          })
        }
        {
          LPFormField.createRequiredField({
            name: 'password',
            label: 'password',
            type: 'password',
            validate: password => password && password.length >= 6,
            errorMsg: 'must be at least 6 characters long'
          })
        }
      </LPForm>
      <br/>
      <div>
        <Button onClick={signinWithGoogle} color={'primary'}>
          Google
        </Button>

        &nbsp;

        <Button size="small" color={'primary'}>
          Facebook
        </Button>
      </div>
    </div>
  )
};
export default connect()(SignUpForm);