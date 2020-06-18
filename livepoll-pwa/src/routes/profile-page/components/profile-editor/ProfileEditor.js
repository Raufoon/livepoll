import React, {useContext} from 'react'
import {useDispatch} from 'react-redux'
import LpForm from '../../../../components/lp-form/LpForm'
import LpField from '../../../../components/lp-form/LpField'
import { actionEditProfileDetails } from '../../../../state-management/actions'
import AuthContext from '../../../../contexts/AuthContext'

export default function ProfileEditor() {
  const dispatch = useDispatch()
  const authUser = useContext(AuthContext)

  function onSubmitNewDetails(details) {
    dispatch(actionEditProfileDetails(authUser.getUid(), details))    
  }

  return (
    <LpForm onSubmit={onSubmitNewDetails} submitLabel="Edit your profile">
      <LpField
        title='Name'
        name='name'
        Component='input'
        type='text'
        validate={value => !!value && value.length > 6}
        errorMsg='should be longer than 6 letters'/>

      <LpField
        title='Date of birth'
        name='dob'
        Component='input'
        type='date'
        validate={value => !!value}
        errorMsg='should be a valid date'/>
      </LpForm>
  )
}