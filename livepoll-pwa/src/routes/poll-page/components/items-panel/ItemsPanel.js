import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { actionVoteForItem, actionUnvoteForItem } from '../../../../state-management/actions/poll-actions'
import TextMajorItem from './components/text-major-item/TextMajorItem'
import './style.css'

function ItemsPanel(props) {
  console.log('Rendering ItemsPanel')

  const dispath = useDispatch()

  const {pollId, items, details, className} = props
  const {itemContentType, votedItemId, totalVotes} = details

  function giveVote(itemId, voteValue) {
    if (itemId === votedItemId) dispath(actionUnvoteForItem(pollId, itemId, voteValue));
    else dispath(actionVoteForItem(pollId, itemId, voteValue));
  }
  
  let Component;
  if (itemContentType === 'TEXT' || itemContentType === 'AVATAR_TEXT') Component = TextMajorItem;
  else return 'Loading...';

  return (
    <div className={`ItemsPanel ${className}`}>
      <label>Results</label>
      {
        items.sort((a, b) => a.score > b.score ? -1: 1)
        .map((item, idx) => {

          return <Component 
            position={idx}
            isVotedByMe={votedItemId === item.id} 
            key={item.id} 
            vote={giveVote}
            totalVotes={totalVotes} 
            item={item}/>
        })
      }
    </div>
  )
}

ItemsPanel.propTypes = {
  items: PropTypes.array.isRequired
}

export default ItemsPanel
