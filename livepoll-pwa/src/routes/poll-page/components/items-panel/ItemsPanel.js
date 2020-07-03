import React, {useMemo, lazy, Suspense} from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { actionVoteForItem, actionUnvoteForItem } from '../../../../state-management/actions/poll-actions'
import usePollDetails from '../../hooks/usePollDetails'
import './style.css'

const TextItem = lazy(() => import('./components/text-item/TextItem'))
const AvatarTextItem = lazy(() => import('./components/avatar-text-item/AvatarTextItem'))
const ImageCaptionItem = lazy(() => import('./components/image-caption-item/ImageCaptionItem'))

const itemSorter = (a, b) => a.score > b.score ? -1: 1

function ItemsPanel(props) {
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
  
  if (itemContentType === 'TEXT') Component = TextItem
  else if (itemContentType === 'AVATAR_TEXT') Component = AvatarTextItem
  else if (itemContentType === 'IMAGE_CAPTION') Component = ImageCaptionItem
  else return 'Loading...';

  return (
    <div className={`ItemsPanel ${className} ${itemContentType === 'IMAGE_CAPTION' ? 'grid':''}`}>
      <Suspense fallback='Loading...'>
        {
          items.sort(itemSorter).map((item, idx) => {
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
