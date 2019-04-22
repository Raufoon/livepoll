import React from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

import LPForm from "../components/LPForm/LPForm";
import LPFormField from "../components/form-fields/LPFormField/LPFormField";
import {actionRequestUpdateBasicInfo} from "../../../services/state-management/actions/my-profile-actions";
import Typography from "@material-ui/core/Typography/Typography";

const CreateProfileForm = (props) => {
  const onSubmit = data => {
    props.dispatch(actionRequestUpdateBasicInfo(data));
    if (props.onModalResult) props.onModalResult();
  };

  return (
    <LPForm title={'Create your profile'} onSubmit={onSubmit}>
      <div className={'pure-u-1-1 lfont'}>Create your profile</div>
      {
        LPFormField.createRequiredField({
          className: 'pure-u-1-1 pad10',
          name: 'name',
          label: 'Full Name',
          type: 'text',
          validate: (value) => !!value && value.length > 5,
          errorMsg: 'Name must have at least 6 letters'
        })
      }

      {
        LPFormField.createRequiredField({
          className: 'pure-u-1-1 pad10',
          name: 'dob',
          label: 'When is your birthday?',
          type: 'date',
          value: '1990-01-01'
        })
      }
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