import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import { actionFetchProfileDetails } from '../../../state-management/actions/user-actions'

export default function useProfileDetails(uid) {
  const details = useSelector(state => state.users[uid])
  const dispatch = useDispatch()

  useEffect(function() {
    if (!details) dispatch(actionFetchProfileDetails(uid))
  }, [uid, details, dispatch])

  return details
}
