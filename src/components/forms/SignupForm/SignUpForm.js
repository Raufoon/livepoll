import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography/Typography";
import { withStyles } from '@material-ui/core/styles';

import LPForm from "../LPForm/LPForm";
import LPFormField from "../form-fields/LPFormField/LPFormField";
import {actionSigninRequest} from "../../../state-management/actions/auth-actions";
import {SIGNIN_METHODS} from "../../../constants/auth-constants";

const styles = theme => ({
  tac: {
    textAlign: 'center'
  },
  googleBtn: {
    backgroundColor: 'yellow',
    color: '#222'
  },
  fbBtn: {
    backgroundColor: '#0082c8',
    color: 'white'
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
    <div className={'tac'}>
      <Typography variant="h5" className={'app-big-title'} gutterBottom>Join Livepoll</Typography>
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
        <br/>
        <Typography variant={'body1'}>We currently do not verify emails</Typography>
      </LPForm>
      <div>
        <Button className={classes.googleBtn} onClick={signinWithGoogle}>Google</Button>
        &nbsp;
        <Button className={classes.fbBtn} size="small">Facebook</Button>
      </div>
    </div>
  )
};

export default connect()(
  withStyles(styles)(
    SignUpForm
  )
);