import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { actionLoadHomeRecentPolls } from '../../../state-management/actions'

export default function useHomeData () {
  const dispatch = useDispatch()
  const polls = useSelector(state => state.home.polls)

  useEffect(function() {
    dispatch(actionLoadHomeRecentPolls())
  }, [])

  return [polls]
}