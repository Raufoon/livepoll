import React from 'react'
import PropTypes from 'prop-types'
import ProgBar from '../../../../../../components/prog-bar/ProgBar'
import './style.css'

export default function TextMajorItem(props) {
  const {item, position, vote, isVotedByMe} = props
  const {text, imgUrl,id, score} = item

  let avatarImgSize = '80px';
  if (position === 0) avatarImgSize = '200px'
  else if (position === 1) avatarImgSize = '128px'

  return (
    <div className='TextMajorItem'>
      <b className='data'>{position + 1}</b>
      {
        imgUrl && <div className='data avatarImg' 
          style={{
            backgroundImage: `url(${imgUrl})`,
            width: avatarImgSize,
            height: avatarImgSize,
          }} />
      }
      <label className='data itemText'>{text}</label>
      <span className='data'>{score} votes</span>
      <span className='data'>90%</span>
      <ProgBar className='data progBar' value={90}/>
      <input className='data' type='checkbox' checked={isVotedByMe} onChange={() => vote(id)}/>
    </div>
  )
}

TextMajorItem.propTypes = {
  item: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  isVotedByMe: PropTypes.bool
}
