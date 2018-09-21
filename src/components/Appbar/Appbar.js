import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import './Appbar.css';
import {actionSignoutRequest} from "../../state-management/actions/auth-actions";
import AuthUserBadge from "../AuthUserBadge/AuthUserBadge";

const Appbar = props => {
  return (
    <div className='app-bar'>
      <button className={'fr'} onClick={() => props.dispatch(actionSignoutRequest())}>Sign out</button>
      <AuthUserBadge className='fr'/>
      <Link to={'/'}>Home</Link>
      <Link to={'/create'}>Create</Link>
    </div>
  )
};
export default connect()(Appbar)