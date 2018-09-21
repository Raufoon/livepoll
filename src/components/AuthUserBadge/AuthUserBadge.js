import React from 'react'
import {connect} from 'react-redux'

import ClickModalOpener from "../modal-openers/ClickModalOpener/ClickModalOpener";
import CreateProfileForm from "../forms/CreateProfileForm/CreateProfileForm";

const AuthUserBadge = props => {
  if (!props.loggedInUserData.name) {
    return (
      <ClickModalOpener
        modalOptions={{hideCloseButton: true}}
        ModalComponent={CreateProfileForm}>
        Complete your profile
      </ClickModalOpener>
    )
  }
  return (
    <div className={`${props.className}`}>
      {
        props.loggedInUserData.name
      }
    </div>
  )
};
const s2p = state => ({
  loggedInUserData: state.auth.userData
});
export default connect(s2p)(AuthUserBadge);