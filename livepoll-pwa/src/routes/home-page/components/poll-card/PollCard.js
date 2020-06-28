import React, {lazy, Suspense} from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const TextItemsView = lazy(() => import('./components/text-items-view/TextItemsView'))

export default function PollCard(props) {
  const {className, id, title, startDateTime, itemContentType, author, items} = props
  const creationDate = new Date(parseInt(startDateTime, 10))

  let ItemsView = () => "XXX";
  if (itemContentType === 'TEXT') ItemsView = TextItemsView
  
  return (
    <div className={`PollCard ${className}`}>
      <Link className="title" to={`polls/${id}`}>{title}</Link>
      <label className="subtitle">By {author.name} at {creationDate.toLocaleTimeString()}</label>
      <Suspense fallback={() => "Loading..."}>
        <ItemsView items={items}/>
      </Suspense>
    </div>
  )
}
