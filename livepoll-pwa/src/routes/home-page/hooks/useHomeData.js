import {useSelector, useDispatch} from 'react-redux'
import { actionLoadHomeRecentPolls } from '../../../state-management/actions/home-actions'

export default function useHomeData () {
  const dispatch = useDispatch()
  const recentPolls = useSelector(state => state.home.recentPolls)

  if (Object.keys(recentPolls).length === 0) dispatch(actionLoadHomeRecentPolls())

  return [recentPolls]
}