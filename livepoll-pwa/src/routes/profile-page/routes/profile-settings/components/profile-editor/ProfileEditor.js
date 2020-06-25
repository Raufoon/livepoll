import React, {useContext, useMemo} from 'react'
import {useDispatch} from 'react-redux'
import LpForm from '../../../../../../components/lp-form/LpForm'
import LpField from '../../../../../../components/lp-form/LpField'
import { actionEditProfileDetails } from '../../../../../../state-management/actions/user-actions'
import AuthContext from '../../../../../../contexts/AuthContext'
import './style.css'

export default function ProfileEditor(props) {
  const dispatch = useDispatch()
  const authUser = useContext(AuthContext)

  const {className} = props

  const onSubmitNewDetails = useMemo(function() {
    return function (details) {
      dispatch(actionEditProfileDetails(authUser.getUid(), details))    
    } 
  }, [authUser, dispatch])

  return (
    <LpForm className={`ProfileEditor ${className}`} onSubmit={onSubmitNewDetails} submitLabel="Edit your profile">
      <LpField
        className='field'
        placeholder='Name'
        name='name'
        Component='input'
        type='text'
        validate={value => !!value && value.length > 6}
        errorMsg='should be longer than 6 letters'/>

      <LpField
        className='field'
        title='Date of birth'
        name='dob'
        Component='input'
        type='date'
        validate={value => !!value}
        errorMsg='should be a valid date'/>
    </LpForm>
  )
}