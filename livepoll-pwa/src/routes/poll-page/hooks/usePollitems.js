import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {actionFetchPollItems, actionFetchVotedItemId} from '../../../state-management/actions/poll-actions'

export default function usePollItems(pollId) {
  const pollItems = useSelector(state => {
    if (!state.polls[pollId]) return undefined
    return state.polls[pollId].items
  })
  const dispatch = useDispatch()

  useEffect(function(){
    if (!pollItems) {
      dispatch(actionFetchPollItems(pollId))
      dispatch(actionFetchVotedItemId(pollId))
    }
  }, [pollId])

  return pollItems
}