import React from 'react'
import VoteLabel from '../../../../components/vote-label/VoteLabel'
import './style.css'
import Responsive from '../../../../components/responsive/Responsive'

export default function AvatarTextItemsView(props) {
  const {items} = props

  return (
    <div className="AvatarTextItemsView">
      {
        items.map(function({id, text, imgUrl, score}, index) {
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
