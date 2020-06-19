import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {actionFetchPollDetails} from '../../../state-management/actions/poll-actions'

export default function usePollDetails(pollId) {
  const pollDetails = useSelector(state => state.polls[pollId])
  const dispatch = useDispatch()

  useEffect(function() {
    if (!pollDetails) {
      dispatch(actionFetchPollDetails(pollId))
    }
  }, [pollId])

  return pollDetails
}