import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button/index';
import Typography from "@material-ui/core/Typography/Typography";
import { withStyles } from '@material-ui/core/styles/index';

import LPForm from "../forms/components/LPForm/LPForm";
import LPFormField from "../forms/components/form-fields/LPFormField/LPFormField";
import {actionSigninRequest} from "../../services/state-management/actions/auth-actions";
import {SIGNIN_METHODS} from "../../constants/auth-constants";

const styles = theme => ({
  tac: {
    textAlign: 'center'
  },
  googleBtn: {

  }
});

const SignUpForm = (props) => {
  const signinWithGoogle = () => {
    props.dispatch(actionSigninRequest(SIGNIN_METHODS.GOOGLE))
  };

  const signinWithEmailPass = (data) => {
    props.dispatch(actionSigninRequest(SIGNIN_METHODS.EMAIL_PASS, data));
  };

  const {classes} = props;

  return (
    <div className={'tac font-comf'}>
      <h1>Join Livepoll</h1>
      <LPForm submitButtonLabel={'Create / Log In'} onSubmit={signinWithEmailPass}>
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
        <br/>
      </LPForm>
      <p>We currently do not verify emails. Use credentials "rg@rg.com" and "123456" to get a quick view</p>
      <button
        className={`pure-button ${classes.googleBtn}`}
        onClick={signinWithGoogle}>
        Sign in with Google
      </button>
    </div>
  )
};

export default connect()(
  withStyles(styles)(
    SignUpForm
  )
);