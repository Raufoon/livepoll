import React from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

import LPForm from "../LPForm/LPForm";
import LPFormField from "../form-fields/LPFormField/LPFormField";
import {
  actionRequestUpdateBasicInfo
} from "../../../state-management/actions/my-profile-actions";

const CreateProfileForm = (props) => {
  const onSubmit = data => {
    props.dispatch(actionRequestUpdateBasicInfo(data));
    if (props.onModalResult) props.onModalResult();
  };
  return (
    <LPForm title={'Create your profile'} onSubmit={onSubmit}>
      <LPFormField
        name={'name'}
        placeholder={'Full Name'}
        type={'String'}
        validate={(value) => !!value && value.length > 5}
        errorMsg={'Name must have at least 6 letters'}/>
      <LPFormField
        name={'dob'}
        title={'Date of birth'}
        type={'date'}
        validate={LPFormField.validators.checkNotNull}
        errorMsg={LPFormField.errorMsgs.shouldNotNull}/>
    </LPForm>
  )
};

const s2p = state => ({
  userId: state.auth.currentUser.uid
});

CreateProfileForm.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default connect(s2p)(CreateProfileForm)