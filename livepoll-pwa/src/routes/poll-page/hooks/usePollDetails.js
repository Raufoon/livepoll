import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {actionFetchPollDetails} from '../../../state-management/actions/poll-actions'

export default function usePollDetails(pollId) {
  const pollDetails = useSelector(function(state) {
    if (!state.polls[pollId]) {
      return undefined
    }
    return state.polls[pollId].details
  })

  const dispatch = useDispatch()

  useEffect(function(){
    if (!pollDetails) {
      dispatch(actionFetchPollDetails(pollId))
    }
  }, [pollId])

  return pollDetails
}