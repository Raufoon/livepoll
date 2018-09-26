import React from 'react'
import {connect} from 'react-redux'

import ModalOpenerButton from "../modal-openers/ModalOpenerButton/ModalOpenerButton";
import CreateProfileForm from "../forms/CreateProfileForm/CreateProfileForm";

const AuthUserBadge = props => {
  if (!props.loggedInUserData.name) {
    return (
      <ModalOpenerButton
        className={`${props.className}`}
        modalOptions={{hideCloseButton: true}}
        ModalComponent={CreateProfileForm}>
        Complete your profile
      </ModalOpenerButton>
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
  loggedInUserData: state.myProfile.basicInfo || {}
});
export default connect(s2p)(AuthUserBadge);