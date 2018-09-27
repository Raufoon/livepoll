import React from 'react';
import {connect} from 'react-redux';
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
    <div>
      <LPForm submitButtonLabel={'Log In'} title={'Join livepoll'} onSubmit={signinWithEmailPass}>
        {
          LPFormField.createRequiredField({
            name: 'email',
            placeholder: 'email or phone',
            type: 'email'
          })
        }
        {
          LPFormField.createRequiredField({
            name: 'password',
            placeholder: 'password',
            type: 'password',
            validate: password => password && password.length >= 6,
            errorMsg: 'must be at least 6 characters long'
          })
        }
      </LPForm>
      <div>
        <input type='button'
               value='Google'
               onClick={signinWithGoogle}/>
        <input type='button'
               value='Facebook'/>
      </div>
    </div>
  )
};
export default connect()(SignUpForm);