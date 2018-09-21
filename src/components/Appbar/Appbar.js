import React from 'react';
import {connect} from 'react-redux';

import './Appbar.css';
import {actionSignoutRequest} from "../../state-management/actions/auth-actions";
import AuthUserBadge from "../AuthUserBadge/AuthUserBadge";
import ModalOpenerButton from "../modal-openers/ModalOpenerButton/ModalOpenerButton";
import PollCreationForm from "../forms/PollCreationForm/PollCreationForm";

const Appbar = props => {
  return (
    <div className='app-bar'>
      <button className={'fr'} onClick={() => props.dispatch(actionSignoutRequest())}>Sign out</button>
      <AuthUserBadge className='fr'/>
      <ModalOpenerButton ModalComponent={PollCreationForm}>
        Create a poll
      </ModalOpenerButton>
    </div>
  )
};
export default connect()(Appbar)