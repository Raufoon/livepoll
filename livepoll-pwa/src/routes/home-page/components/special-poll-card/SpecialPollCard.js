import React, { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import TextItemsView from '../text-items-view/TextItemsView'
import './style.css'

const AvatarTextItemsView = lazy(() => import('../avatar-text-items-view/AvatarTextItemsView')) 
const CaptionImageItemsView = lazy(() => import('./components/caption-image-items-view/CaptionImageItemsView')) 

export default function SpecialPollCard(props) {
  const {className, poll} = props
  const {id, title, startDateTime, itemContentType, author, items} = poll
  const creationDate = new Date(parseInt(startDateTime, 10))

  let ItemsView = TextItemsView;
  if (itemContentType === 'AVATAR_TEXT') ItemsView = AvatarTextItemsView
  else if (itemContentType === 'IMAGE_CAPTION') ItemsView = CaptionImageItemsView
  
  return (
    <div className={`SpecialPollCard ${className}`}>
      <label className="banner">Today's Top</label>
      
      <Link to={`/polls/${id}`} className="title">{title}</Link>
      
      <label className="subtitle">By {author.name} at {creationDate.toLocaleString()}</label>
      
      <Suspense fallback={"Loading..."}>
        <ItemsView items={items}/>
      </Suspense>
    </div>
  )
}
