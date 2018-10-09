import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

import LPForm from "../LPForm/LPForm";
import LPFormField from "../form-fields/LPFormField/LPFormField";
import Typography from "@material-ui/core/Typography/Typography";
import {requestAddPollitem} from "../../../util/cloud/livepoll";
import {actionRequestAddItemSuccess} from "../../../state-management/actions/livepoll-actions";

const CreateItemForm = props => {
  const onSubmit = (data) => {
    requestAddPollitem(props.pollId, data)
      .then((response) => {
        props.dispatch(actionRequestAddItemSuccess(props.pollId, response.item))
        if (props.onModalResult) props.onModalResult();
      });
  };

  return (
    <LPForm submitButtonLabel={'Add item'} onSubmit={onSubmit}>
      <Typography variant="subtitle1" gutterBottom>Create an item</Typography>
      {
        LPFormField.createRequiredField({
          name: 'text',
          type: 'text',
          label: 'Enter a text',
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