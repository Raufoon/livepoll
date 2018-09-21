import React from 'react'
import {connect} from 'react-redux';

import LPForm from "../LPForm/LPForm";
import LPFormField from "../form-fields/LPFormField/LPFormField";
import {requestCreateUser} from "../../../util/cloud/user";
import {actionAuthUserDataReceived} from "../../../state-management/actions/auth-actions";

const CreateProfileForm = (props) => {
  const onSubmit = data => {
    requestCreateUser(props.userId, data)
      .then((response) => {
        // if opened from modal
        if (props.onModalResult) props.onModalResult();
        props.dispatch(actionAuthUserDataReceived(response.user));
      })
  };
  return (
    <LPForm title={'Create your profile'} onSubmit={onSubmit}>
      <LPFormField
        name={'name'}
        placeholder={'Full Name'}
        type={'String'}
        validate={(value) => value.length > 5}
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
  userId: state.auth.userData.id
});
export default connect(s2p)(CreateProfileForm)