import React from 'react'
import LPForm from "../LPForm/LPForm";
import LPFormField from "../form-fields/LPFormField/LPFormField";

const PollCreationForm = props => {
  return (
    <LPForm title={'Create a poll'} totalFields={1} onSubmit={() => {}}>
      <LPFormField
        name={'title'}
        type={'text'}
        placeholder={'Title'}
        validate={LPFormField.validators.checkNotNull}
        errorMsg={LPFormField.errorMsgs.shouldNotNull}/>
    </LPForm>
  )
};

export default PollCreationForm