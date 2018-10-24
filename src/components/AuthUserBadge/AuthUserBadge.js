import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Loadable from 'react-loadable';

import ModalOpenerButton from "../utils/modal-openers/ModalOpenerButton/ModalOpenerButton";
import LPLoader from "../loaders/LPLoader";

const CreateProfileForm = Loadable({
  loader: ()=>import('../forms/CreateProfileForm/CreateProfileForm'),
  loading: LPLoader,
});

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

  const goToProfile = () => props.history.push('/me');
  return (
    <Chip
      className={props.className}
      avatar={<Avatar>{props.loggedInUserData.name[0]}</Avatar>}
      label={props.loggedInUserData.name}
      onClick={goToProfile}
    />
  );
};

const s2p = state => ({
  loggedInUserData: state.myProfile.basicInfo || {}
});

AuthUserBadge.propTypes = {
  loggedInUserData: PropTypes.object
};

export default withRouter(
  connect(s2p)(
    AuthUserBadge
  )
);