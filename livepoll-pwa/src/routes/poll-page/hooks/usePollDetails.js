import {useSelector, useDispatch} from 'react-redux'

export default function usePollDetails(pollId) {
  const details = useSelector(state => state.polls[pollId])

  return details
}