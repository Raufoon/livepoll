import React, {lazy, Suspense} from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const TextItemsView = lazy(() => import('./components/text-items-view/TextItemsView'))
const AvatarTextItemsView = lazy(() => import('../avatar-text-items-view/AvatarTextItemsView'))

export default function PollCard(props) {
  const {className, id, title, startDateTime, itemContentType, author, items} = props
  const creationDate = new Date(parseInt(startDateTime, 10))

  let ItemsView = TextItemsView;
  if (itemContentType === 'AVATAR_TEXT' || itemContentType === 'IMAGE_CAPTION') ItemsView = AvatarTextItemsView
  
  return (
    <div className={`PollCard ${className}`}>
      <Link className="title" to={`polls/${id}`}>{title}</Link>
      <label className="subtitle">By {author.name} at {creationDate.toLocaleString()}</label>
      <Suspense fallback={() => "Loading..."}>
        <ItemsView items={items}/>
      </Suspense>
    </div>
  )
}
