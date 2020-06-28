import React from 'react'
import avatarIcon from '../../../poll-page/components/user-badge/images/default-user.png'
import './style.css'

export default function ProfileSummary(props) {
  const {className, details} = props
  if (!details) return 'Loading...'

  const {avatar, name, id} = details

  return (
    <div className={`ProfileSummary ${className}`}>
      <div className='userPropic' style={{backgroundImage: `url(${avatar || avatarIcon})`}}/>
      <label className='userfullname'>{name}</label>
      <label className='subtitle'>livepoll user</label>
    </div>
  )
}
