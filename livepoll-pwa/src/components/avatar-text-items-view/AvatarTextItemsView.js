import React from 'react'
import VoteLabel from '../vote-label/VoteLabel'
import Responsive from '../responsive/Responsive'
import './style.css'

const compare = (a, b) => a.score > b.score? -1:1

export default function AvatarTextItemsView(props) {
  const {items} = props

  return (
    <div className="AvatarTextItemsView">
      {
        items.sort(compare).map(function({id, text, imgUrl, score}, index) {
          return (
            <div className="item" key={id}>
              <Responsive screens={['M', 'L']}>
                <div className="avatar" style={{backgroundImage: `url(${imgUrl})`}}/>
              </Responsive>

              <Responsive screens={['S']}>
                <div className="avatar" style={{
                  backgroundImage: `url(${imgUrl})`,
                  width: '75px', height: '75px'
                }}/>
              </Responsive>

              <label>{1+index}. {text}</label>
              
              <VoteLabel count={score}/>
            </div>
          )
        })
      }      
    </div>
  )
}
