import React from 'react'
import {useParams} from 'react-router-dom'
import useProfileDetails from './hooks/useProfileDetails'
import ProfileEditor from './components/profile-editor/ProfileEditor'
import ProfileSummary from './components/profile-summary/ProfileSummary'
import './style.css'

export default function ProfilePage() {
  console.log('Rendering ProfilePage')

  const {id} = useParams()
  const details = useProfileDetails(id)
  

  return (
    <div className='ProfilePage'>
      <div className='leftSect'>
        <ProfileSummary className='profileSummary' details={details}/>
      </div>

      <div className='rightSect'>
        XXXXX
      </div>      
    </div>
  )
}
