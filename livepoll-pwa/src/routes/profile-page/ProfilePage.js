import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import useProfileDetails from './hooks/useProfileDetails'
import ProfileEditor from './components/profile-editor/ProfileEditor'

export default function ProfilePage() {
  const {id} = useParams()
  const details = useProfileDetails(id)
  const authUser = useContext(AuthContext)
  const isMyProfile = authUser.getUid() === id

  console.log('Rendering ProfilePage')

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
        isMyProfile && <ProfileEditor/>
      }      
    </div>
  )
}
