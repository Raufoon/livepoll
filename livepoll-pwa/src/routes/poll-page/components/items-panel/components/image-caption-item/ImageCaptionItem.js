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

  return(
    <div className='ImageCaptionItem'>
      <div className="topRow">
        <label className="caption">{1+position}. {text}</label>
        <input type='checkbox' checked={isVotedByMe} onChange={() => vote(id)}/>
      </div>
      <Responsive screens={['M', 'L']}>
        <img className='image' src={imgUrl} alt="item"/>
      </Responsive>
      <Responsive screens={['S']}>
        <img className='image mobile' src={imgUrl} alt="item"/>
      </Responsive>
      <ProgBar className='progBar' value={percent || 1}/>
      {voteLabel}
    </div>
  )
}
