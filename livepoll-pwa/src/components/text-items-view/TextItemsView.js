import React from 'react'
import VoteLabel from '../vote-label/VoteLabel'
import './style.css'

const compare = (a, b) => a.score > b.score? -1:1

export default function TextItemsView(props) {
  const {items} = props

  return (
    <div className="TextItemsView">
      {
        items.sort(compare).map(function({id, text, score}, index) {
          return <div className="item" key={id}>
            <label>{1+index}. {text}</label>
            &nbsp;
            <VoteLabel count={score}/>
          </div>
        })
      }      
    </div>
  )
}
