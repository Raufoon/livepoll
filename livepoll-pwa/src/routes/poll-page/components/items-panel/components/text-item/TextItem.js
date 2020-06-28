import React from 'react'
import Responsive from '../../../../../../components/responsive/Responsive'
import VoteLabel from '../../../../../../components/vote-label/VoteLabel'
import ProgBar from '../../../../../../components/prog-bar/ProgBar'
import './style.css'

export default function TextItem(props) {
  const {item, position, vote, isVotedByMe, displayVoterList, shouldShowVoters, totalVotes} = props
  const {text, id, score} = item

  const percent = Math.ceil((score *100) / (totalVotes||1))
  const progbar = <ProgBar className='progBar' value={percent || 1}/>
  const voteLabel = shouldShowVoters ? (
    <VoteLabel count={score} percent={percent} onClick={() => displayVoterList(item.id)}/>
  ):(
    <VoteLabel count={score} percent={percent}/>
  )
  const voteCheckbox = <input type='checkbox' checked={isVotedByMe} onChange={() => vote(id)}/>

  return(
    <div className='TextItem'>
      <label className="index">{1 + position}</label>
      <div className="rightColumn">
        <div className="title">{text}</div>
        <div className="voteData">
          {voteCheckbox}
          {voteLabel}
        </div>
        {progbar}
      </div>
    </div>
  )
}
