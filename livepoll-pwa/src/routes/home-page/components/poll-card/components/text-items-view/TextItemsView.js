import React from 'react'
import VoteLabel from '../../../../../../components/vote-label/VoteLabel'
import './style.css'

export default function TextItemsView(props) {
  const {items} = props

  return (
    <div className="TextItemsView">
      {
        items.map(function({id, text, score}, index) {
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
