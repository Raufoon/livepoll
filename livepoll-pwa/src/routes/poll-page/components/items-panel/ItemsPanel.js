import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { actionVoteForItem, actionUnvoteForItem } from '../../../../state-management/actions/poll-actions'
import TextMajorItem from './components/text-major-item/TextMajorItem'
import usePollDetails from '../../hooks/usePollDetails'
import './style.css'

function ItemsPanel(props) {
  console.log('Rendering ItemsPanel')

  const {pollId, items, className, displayVoterList} = props

  const dispath = useDispatch()

  const details = usePollDetails(pollId) || {}
  
  const {itemContentType, votedItemId, totalVotes, shouldShowVoters} = details

  const giveVote = useMemo(() => {
    return function (itemId, voteValue) {
      if (itemId === votedItemId) {
        dispath(actionUnvoteForItem(pollId, itemId, voteValue))
      }
      else {
        dispath(actionVoteForItem(pollId, itemId, voteValue))
      }
    }
  }, [pollId, votedItemId, dispath])
  
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
            shouldShowVoters={shouldShowVoters}
            displayVoterList={displayVoterList}
            totalVotes={totalVotes} 
            item={item}/>
        })
      }
    </div>
  )
}

ItemsPanel.propTypes = {
  items: PropTypes.array.isRequired,
  displayVoterList: PropTypes.func,
  pollId: PropTypes.string,
}

export default ItemsPanel
