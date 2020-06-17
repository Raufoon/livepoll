import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import useProfileDetails from './hooks/useProfileDetails'
import LpForm from '../../components/lp-form/LpForm'
import LpField from '../../components/lp-form/LpField'

export default function ProfilePage() {
  const {id} = useParams()
  const details = useProfileDetails(id)
  const authUser = useContext(AuthContext)

  const isMyProfile = authUser.getUid() === id

  function onSubmitNewDetails() {
    
  }

  return (
    <div>
      {
        !details && `fetching user with ID ${id}`
      }
      {
        details && JSON.stringify(details)
      }
      <br/><br/>
      
      {
        isMyProfile && <LpForm onSubmit={onSubmitNewDetails} submitLabel="Edit your profile">
          <LpField
            title='Name'
            name='name'
            Component='input'
            type='text'
            validate={value => !!value && value.length > 6}
            errorMsg='Name should be longer than 6 letters'
          />
          <LpField
            title='Date of birth'
            name='dob'
            Component='input'
            type='date'
            validate={value => !!value}
            errorMsg='Should be a valid date'
          />
        </LpForm>
      }      
    </div>
  )
}
