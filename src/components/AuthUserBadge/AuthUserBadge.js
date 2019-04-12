import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Loadable from 'react-loadable';

import ModalOpenerButton from "../utils/modal-openers/ModalOpenerButton/ModalOpenerButton";
import LPLoader from "../loaders/LPLoader";
import ImageButton from "../utils/ImageButton";
import MediaQuery from "react-responsive";

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
    <ImageButton
      className={props.className}
      iconHeight={30}
      src={'https://static.thenounproject.com/png/99472-200.png'}
      onClick={goToProfile}>
      <MediaQuery minWidth={800}>{props.loggedInUserData.name}</MediaQuery>
      <MediaQuery maxWidth={799}>{props.loggedInUserData.name.split(' ')[0]}</MediaQuery>
    </ImageButton>
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