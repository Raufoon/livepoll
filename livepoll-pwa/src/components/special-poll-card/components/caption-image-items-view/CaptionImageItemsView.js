import React from 'react'
import VoteLabel from '../../../../components/vote-label/VoteLabel'
import './style.css'

const compare = (a, b) => a.score > b.score? -1:1

export default function CaptionImageItemsView(props) {
  const {items} = props
  const {imgUrl, text, score} = items.sort(compare)[0]
  return (
    <div className='CaptionImageItemsView'>
      <div className="header">
        <label>1. {text}</label><VoteLabel count={score}/>
      </div>
      <img src={imgUrl} alt='top item'/>
    </div>
  )
}
