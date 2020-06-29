import React from 'react'
import VoteLabel from '../../../../../../components/vote-label/VoteLabel'
import './style.css'

export default function AvatarTextItemsView(props) {
  const {items} = props

  return (
    <div className="AvatarTextItemsView">
      {
        items.map(function({id, text, imgUrl, score}, index) {
          return (
            <div className="item" key={id}>
              <div className="avatar" style={{backgroundImage: `url(${imgUrl})`}}/>
              
              <label>{1+index}. {text}</label>
              
              <VoteLabel count={score}/>
            </div>
          )
        })
      }      
    </div>
  )
}
