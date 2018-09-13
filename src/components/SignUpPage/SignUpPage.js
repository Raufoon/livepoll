import React from 'react';

import './SignUpPage.css';

const SignUpPage = () => {
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
          <button className='webapp-shortcut-signin-btn'>Google</button>
          <button className='webapp-shortcut-signin-btn'>Facebook</button>
        </div>
      </form>
    </div>
  )
};

export default SignUpPage;