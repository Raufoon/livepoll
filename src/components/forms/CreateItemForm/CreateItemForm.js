import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

import LPForm from "../LPForm/LPForm";
import LPFormField from "../form-fields/LPFormField/LPFormField";
import {requestAddPollitem} from "../../../util/cloud/livepoll";

const CreateItemForm = props => {
  const onSubmit = (data) => {
    requestAddPollitem(props.pollId, data).then((response) => {
      // props.dispatch() refresh the item list
      if (props.onModalResult) props.onModalResult();
    });
  };

  return (
    <LPForm title={'Create an item'} submitButtonLabel={'Add item'} onSubmit={onSubmit}>
      {
        LPFormField.createRequiredField({
          name: 'text',
          type: 'text',
          placeholder: 'text',
        })
      }
    </LPForm>
  )
};

CreateItemForm.propTypes = {
  pollId: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
};

export default connect()(CreateItemForm)