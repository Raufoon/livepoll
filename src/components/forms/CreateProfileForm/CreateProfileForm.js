import React from 'react'
import {connect} from 'react-redux';

import LPForm from "../LPForm/LPForm";
import LPFormField from "../form-fields/LPFormField/LPFormField";
import {requestCreateUser} from "../../../util/cloud/user";

const CreateProfileForm = (props) => {
  return (
    <LPForm title={'Create your profile'}
            onSubmit={data => requestCreateUser(props.userId, data)}>
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
        validate={(value) => !!value}
        errorMsg={'cannot be empty'}/>
    </LPForm>
  )
};
const s2p = state => ({
  userId: state.auth.userData.id
});
export default connect(s2p)(CreateProfileForm)