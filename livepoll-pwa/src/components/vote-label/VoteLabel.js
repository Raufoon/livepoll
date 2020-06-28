import React from 'react'
import IconButton from '../icon-button/IconButton'
import starIcon from './images/star.png'
import './style.css'

export default function VoteLabel(props) {
  const {count, className, onClick, percent} = props

  return (
    <IconButton className={`VoteLabel ${className}`} onClick={onClick} iconUrl={starIcon} iconClass='icon'>
      {count} Votes {percent !== undefined && `(${percent}%)`}
    </IconButton>
  )
}
