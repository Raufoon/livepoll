import React from 'react';
import {connect} from 'react-redux';
import {actionSignoutRequest} from "../../state-management/actions/auth-actions";

const HomePage = props => {
  return (
    <div>
      Successfully signed in.<br/>
      <button onClick={() => props.dispatch(actionSignoutRequest())}>Sign out</button>
    </div>
  )
};
export default connect()(HomePage)