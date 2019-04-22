import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

import LPForm from "../../../../components/forms/components/LPForm/LPForm";
import LPFormField from "../../../../components/forms/components/form-fields/LPFormField/LPFormField";
import {requestAddPollitem} from "../../../../services/util/cloud/livepoll";
import {actionRequestAddItemSuccess} from "../../../../services/state-management/actions/livepoll-actions";

const ItemCreationForm = props => {
  const onSubmit = (data) => {
    requestAddPollitem(props.pollId, data)
      .then((response) => {
        props.dispatch(actionRequestAddItemSuccess(props.pollId, response.item))
        if (props.onModalResult) props.onModalResult();
      });
  };

  return (
    <LPForm submitButtonLabel={'Add item'} onSubmit={onSubmit}>
      <h2 className={'font-comf'}>Create an item</h2>
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

ItemCreationForm.propTypes = {
  pollId: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
};

export default connect()(ItemCreationForm)