import React, {useMemo, lazy, Suspense} from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { actionVoteForItem, actionUnvoteForItem } from '../../../../state-management/actions/poll-actions'
import usePollDetails from '../../hooks/usePollDetails'
import './style.css'

const TextMajorItem = lazy(() => import('./components/text-major-item/TextMajorItem'))

function ItemsPanel(props) {
  console.log('Rendering ItemsPanel')

  const dispath = useDispatch()

  const {pollId, items, className, displayVoterList} = props 
  const details = usePollDetails(pollId) || {}
  const {itemContentType, votedItemId, totalVotes, shouldShowVoters} = details
  let Component;
  
  const giveVote = useMemo(() => {
    return function (itemId, voteValue) {
      if (itemId === votedItemId) dispath(actionUnvoteForItem(pollId, itemId, voteValue));
      else dispath(actionVoteForItem(pollId, itemId, voteValue));
    }
  }, [pollId, votedItemId, dispath])
  
  if (itemContentType === 'TEXT' || itemContentType === 'AVATAR_TEXT') Component = TextMajorItem;
  else return 'Loading...';

  return (
    <div className={`ItemsPanel ${className}`}>
      <Suspense fallback='Loading...'>
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
      </Suspense>
    </div>
  )
}

ItemsPanel.propTypes = {
  items: PropTypes.array.isRequired,
  displayVoterList: PropTypes.func,
  pollId: PropTypes.string,
}

export default ItemsPanel
