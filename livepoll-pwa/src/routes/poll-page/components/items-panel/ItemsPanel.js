import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { actionVoteForItem } from '../../../../state-management/actions/poll-actions'
import TextMajorItem from './components/text-major-item/TextMajorItem'
import './style.css'

function ItemsPanel(props) {
  console.log('Rendering ItemsPanel')
  const dispath = useDispatch()

  const {pollId, items, details, className} = props
  
  function giveVote(itemId, voteValue) {
    dispath(actionVoteForItem(pollId, itemId, voteValue))
  }

  const {itemContentType} = details

  let Component;

  if (itemContentType === 'TEXT' || itemContentType === 'AVATAR_TEXT') {
    Component = TextMajorItem
  }

  return (
    <div className={`ItemsPanel ${className}`}>
      <label>Results</label>
      {
        items.sort((a, b) => a.score > b.score ? -1: 1)
        .map((item, idx) => <Component position={idx} key={item.id} vote={giveVote} item={item}/>)
      }
    </div>
  )
}

ItemsPanel.propTypes = {
  items: PropTypes.array.isRequired
}

export default ItemsPanel
