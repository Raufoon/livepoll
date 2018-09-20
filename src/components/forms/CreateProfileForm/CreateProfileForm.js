import React from 'react'
import LPForm from "../LPForm/LPForm";
import LPFormField from "../form-fields/LPFormField/LPFormField";

const CreateProfileForm = () => {
  return (
    <LPForm title={'Create your profile'} onSubmit={data => alert(JSON.stringify(data))}>
      <LPFormField
        name={'fullName'}
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

export default CreateProfileForm