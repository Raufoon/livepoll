import React from 'react';
import {connect} from 'react-redux';

import './Appbar.css';
import {actionSignoutRequest} from "../../state-management/actions/auth-actions";
import AuthUserBadge from "../AuthUserBadge/AuthUserBadge";

const Appbar = props => {
  return (
    <div className='app-bar'>
      <button className={'fr'} onClick={() => props.dispatch(actionSignoutRequest())}>Sign out</button>
      <AuthUserBadge className='fr'/>
    </div>
  )
};
export default connect()(Appbar)