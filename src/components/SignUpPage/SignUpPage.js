import React from 'react';
import {connect} from 'react-redux';

import './SignUpPage.css';
import {actionSigninRequest} from "../../state-management/actions/auth-actions";

const SignUpPage = (props) => {
  const join = () => {
    props.dispatch(actionSigninRequest())
  };

  return (
    <div className='signup-page'>
      <div className='signup-page-content'>
        <label className='webapp-label'>livepoll</label><br/><br/>
        <button className='webapp-ep-input' onClick={join}>Join us</button>
      </div>
    </div>
  )
};
export default connect()(SignUpPage);