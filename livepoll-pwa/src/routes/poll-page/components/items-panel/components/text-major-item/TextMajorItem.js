import React from 'react'
import PropTypes from 'prop-types'
import ProgBar from '../../../../../../components/prog-bar/ProgBar'
import firstMedal from './images/1st-trophy.png'
import './style.css'
import VoteLabel from '../../../../../../components/vote-label/VoteLabel'

export default function TextMajorItem(props) {
  const {item, position, vote, isVotedByMe, displayVoterList, shouldShowVoters, totalVotes} = props
  const {text, imgUrl,id, score} = item

  let avatarImgSize = '80px';
  if (position === 0) avatarImgSize = '200px'
  else if (position === 1) avatarImgSize = '128px'

  const percent = Math.ceil((score *100) / (totalVotes||1))

  return (
    <div className={`TextMajorItem ${position === 0 ? 'FirstTextItem': ''}`}>

      {position === 0 && !imgUrl && <img className='data firstMedal' src={firstMedal} alt="medal for first item"/>}

      {(position > 0 || imgUrl) && <b className='data'>{position + 1}</b>}
      
      {
        imgUrl && <div className='data avatarImg' 
          style={{
            backgroundImage: `url(${imgUrl})`,
            width: avatarImgSize,
            height: avatarImgSize,
          }} />
      }

      <label className='data itemText'>{text}</label>
      
      {
        shouldShowVoters && <button 
          className='data displayVotersBtn' 
          onClick={() => displayVoterList(item.id)}
        >{score} votes</button>
      }
      
      {
        !shouldShowVoters && <VoteLabel className='data' count={score}/>
      }
      
      <span className='data'>{percent}%</span>
      
      <ProgBar className='data progBar' value={percent || 1}/>
      
      <input className='data' type='checkbox' checked={isVotedByMe} onChange={() => vote(id)}/>

    </div>
  )
}

TextMajorItem.propTypes = {
  item: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  isVotedByMe: PropTypes.bool,
  displayVoterList: PropTypes.func
}
