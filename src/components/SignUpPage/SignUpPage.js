import React from 'react';
import {connect} from 'react-redux';

import './SignUpPage.css';
import {actionSigninRequest} from "../../state-management/actions/auth-actions";
import {SIGNIN_METHODS} from "../../constants/auth-constants";

const SignUpPage = (props) => {
  const signinWithGoogle = () => {
    props.dispatch(actionSigninRequest(SIGNIN_METHODS.GOOGLE))
  };

  return (
    <div className='signup-page'>
      <form className='signup-page-content'>
        <label className='webapp-label'>livepoll</label><br/><br/>
        <input className='webapp-ep-input'
               type='email'
               autoComplete='on'
               placeholder='email or phone'/><br/>
        <input className='webapp-ep-input'
               type='password'
               placeholder='password'
               autoComplete='on'/><br/>
        <button className='webapp-ep-input'>Log In</button>
        <div>
          <input className='webapp-shortcut-signin-btn'
                 type='button'
                 value='Google'
                 onClick={signinWithGoogle}/>
          <input className='webapp-shortcut-signin-btn'
                 type='button'
                 value='Facebook'/>
        </div>
      </form>
    </div>
  )
};
export default connect()(SignUpPage);