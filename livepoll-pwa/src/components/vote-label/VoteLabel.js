import React from 'react'
import IconButton from '../icon-button/IconButton'
import starIcon from './images/star.png'
import './style.css'

export default function VoteLabel(props) {
  const {count, className} = props

  return (
    <IconButton className={`VoteLabel ${className}`} iconUrl={starIcon} iconClass='icon'>{count}</IconButton>
  )
}
