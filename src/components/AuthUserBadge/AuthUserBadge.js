import React from 'react'
import {connect} from 'react-redux'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

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
    <Chip
      className={props.className}
      avatar={<Avatar>{props.loggedInUserData.name[0]}</Avatar>}
      label={props.loggedInUserData.name}
      onClick={() => {}}
    />
  );
};
const s2p = state => ({
  loggedInUserData: state.myProfile.basicInfo || {}
});
export default connect(s2p)(AuthUserBadge);