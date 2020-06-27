import React from 'react'
import PropTypes from 'prop-types'
import ProgBar from '../../../../../../components/prog-bar/ProgBar'
import firstMedal from './images/1st-trophy.png'
import VoteLabel from '../../../../../../components/vote-label/VoteLabel'
import './style.css'

export default function TextMajorItem(props) {
  const {item, position, vote, isVotedByMe, displayVoterList, shouldShowVoters, totalVotes} = props
  const {text, imgUrl,id, score} = item

  let avatarImgSize = '80px';
  if (position === 0) avatarImgSize = '200px'
  else if (position === 1) avatarImgSize = '128px'

  const percent = Math.ceil((score *100) / (totalVotes||1))

  // views
  const itemIndex = position === 0 && !imgUrl ? (
    <img className='firstMedal' src={firstMedal} alt="medal for first item"/>
  ):(
    <b>{position + 1}</b>
  )

  const image = imgUrl && <div className='avatarImg' 
    style={{
      backgroundImage: `url(${imgUrl})`,
      width: avatarImgSize,
      height: avatarImgSize,
    }} />

  const voteLabel = shouldShowVoters ? (
    <VoteLabel className='displayVotersBtn' count={score} onClick={() => displayVoterList(item.id)}/>
  ):(
    <VoteLabel count={score}/>
  )

  return (
    <div className={`TextMajorItem ${position === 0 ? 'FirstTextItem': ''}`}>
      {itemIndex}
      {image}

      <label className='itemText'>{text}</label>
      
      {voteLabel}
      
      <span>{percent}%</span>
      <ProgBar className='progBar' value={percent || 1}/>
      <input type='checkbox' checked={isVotedByMe} onChange={() => vote(id)}/>

    </div>
  )
}

TextMajorItem.propTypes = {
  item: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  isVotedByMe: PropTypes.bool,
  displayVoterList: PropTypes.func
}
