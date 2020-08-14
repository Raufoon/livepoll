import React from 'react'
import Responsive from '../../../../../../components/responsive/Responsive'
import VoteLabel from '../../../../../../components/vote-label/VoteLabel'
import ProgBar from '../../../../../../components/prog-bar/ProgBar'
import './style.css'

export default function ImageCaptionItem(props) {
  const {item, position, vote, isVotedByMe, displayVoterList, shouldShowVoters, totalVotes} = props
  const {text, id, imgUrl, score} = item

  const percent = Math.ceil((score *100) / (totalVotes||1))
  const voteLabel = shouldShowVoters ? (
    <VoteLabel className="voteLabel" count={score} percent={percent} onClick={() => displayVoterList(item.id)}/>
  ):(
    <VoteLabel className="voteLabel" count={score} percent={percent}/>
  )

  const topRow = (
    <div className="topRow">
      <label className="caption">{1+position}. {text}</label>
      <input type='checkbox' checked={isVotedByMe} onChange={() => vote(id)}/>
    </div>
  )

  return <>
    <Responsive screens={['M', 'L']}>
      <div className='ImageCaptionItem'>
        {topRow}
        <div style={{textAlign: 'center', backgroundColor: '#1e1e1e', padding: 5}}>
          <img className='image' src={imgUrl} alt="item"/>
        </div>
        {voteLabel}
      </div>
    </Responsive>
    
    <Responsive screens={['S']}>
      <div className='ImageCaptionItem mobile'>
        {topRow}
        <img className='image mobile' src={imgUrl} alt="item"/>
        {voteLabel}
      </div>
    </Responsive>
  </>
}
