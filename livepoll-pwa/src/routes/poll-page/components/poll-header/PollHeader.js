import React from 'react'
import './style.css'
import UserBadge from '../user-badge/UserBadge'

export default function PollHeader(props) {
  const {
    title, startDateTime, endDateTime, author, itemContentType,
    shouldShowVoters, usagePrivacy, whenToAddItem, votingSystem
  } = props.details

  const {name} = author
  const creationDateTime = new Date(parseInt(startDateTime, 10))

  return (
    <div className='PollHeader'>
      <label className='pollTitle'>{title}</label>
      <div className="pollDesc">
        <span>Created by</span>
        &nbsp;
        <UserBadge name={name}/>
        &nbsp;on&nbsp; 
        <b>{creationDateTime.toLocaleDateString()}</b> 
        &nbsp;at&nbsp;
        <b>{creationDateTime.toLocaleTimeString()}</b>
      </div>
    </div>
  )
}
