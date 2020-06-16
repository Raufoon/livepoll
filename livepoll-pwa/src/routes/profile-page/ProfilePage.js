import React from 'react'
import {useParams} from 'react-router-dom'
import useProfileDetails from './hooks/useProfileDetails'

export default function ProfilePage() {
  const {id} = useParams()
  const details = useProfileDetails(id)

  return (
    <div>
      {
        !details && `fetching user with ID ${id}`
      }
      {
        details && JSON.stringify(details)
      }      
    </div>
  )
}
