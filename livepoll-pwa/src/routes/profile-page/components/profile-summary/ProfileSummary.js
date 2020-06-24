import React, {useContext} from 'react'
import avatarIcon from '../../../poll-page/components/user-badge/images/default-user.png'
import { NavLink } from 'react-router-dom'
import IconButton from '../../../../components/icon-button/IconButton'
import AuthContext from '../../../../contexts/AuthContext'
import activityIcon from './images/activity.png'
import pollsIcon from './images/polls.png'
import settingsIcon from './images/settings.png'
import './style.css'

export default function ProfileSummary(props) {
  const authUser = useContext(AuthContext)

  const {className, details} = props
  if (!details) return 'Loading...'

  const {avatar, name, id} = details
  const isMyProfile = authUser.getUid() === id

  return (
    <div className={`ProfileSummary ${className}`}>
      <div className='userPropic' style={{backgroundImage: `url(${avatar || avatarIcon})`}}/>
      <label className='userfullname'>{name}</label>
      <label>livepoll user</label>

      <nav>
        <IconButton to='/activity' iconClass='icon' iconUrl={activityIcon}>Activity</IconButton>
        <IconButton to='/polls' iconClass='icon' iconUrl={pollsIcon}>Polls</IconButton>
        {
          isMyProfile && <>
            <IconButton to='/settings' iconClass='icon' iconUrl={settingsIcon}>settings</IconButton>
          </>
        }
      </nav>
    </div>
  )
}
