import React from 'react'
import PropTypes from 'prop-types'
import ProgBar from '../../../../../../components/prog-bar/ProgBar'
import firstMedal from './images/1st-trophy.png'
import VoteLabel from '../../../../../../components/vote-label/VoteLabel'
import Responsive from '../../../../../../components/responsive/Responsive'
import './style.css'

export default function TextMajorItem(props) {
  const {item, position, vote, isVotedByMe, displayVoterList, shouldShowVoters, totalVotes} = props
  const {text, imgUrl,id, score} = item

  let avatarImgSize = '6em';
  if (position === 0) avatarImgSize = '10em'
  else if (position === 1) avatarImgSize = '8em'

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

  const itemLabel = <label className='itemText'>{text}</label>
  const percentView = <span>{percent}%</span>
  const progbar = <ProgBar className='progBar' value={percent || 1}/>
  const voteCheckbox = <input type='checkbox' checked={isVotedByMe} onChange={() => vote(id)}/>

  return (
    <div className={`TextMajorItem`}>
      <Responsive screens={['M', 'L']}>
        {itemIndex}
        {image}
        {itemLabel}
        {voteLabel}
        {percentView}
        {progbar}
        {voteCheckbox}
      </Responsive>
      <Responsive screens={['S']}>
        {
          imgUrl && <>
            {image}
            <div className='mobileItem'>
              <div className="info">{itemIndex}.&nbsp;{itemLabel}</div>
              <div className="info">{voteLabel}{voteCheckbox}</div>
              <div className="info">{percentView} votes</div>
            </div>
          </>
        }
      </Responsive>
    </div>
  )
}

TextMajorItem.propTypes = {
  item: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  isVotedByMe: PropTypes.bool,
  displayVoterList: PropTypes.func
}
