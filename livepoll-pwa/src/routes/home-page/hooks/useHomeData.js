import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { actionLoadHomeRecentPolls } from '../../../state-management/actions'

export default function useHomeData () {
  const dispatch = useDispatch()
  const recentPolls = useSelector(state => state.home.recentPolls)

  useEffect(function() {
    if (Object.keys(recentPolls).length === 0) dispatch(actionLoadHomeRecentPolls())
  }, [])

  return [recentPolls]
}