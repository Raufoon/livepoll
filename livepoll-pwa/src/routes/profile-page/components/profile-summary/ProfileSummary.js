import React, {useMemo} from 'react'
import {useHistory} from 'react-router-dom'
import avatarIcon from '../../../poll-page/components/user-badge/images/default-user.png'
import { signOut } from '../../../../services/auth'
import signOutIcon from '../../../../components/app-sidebar/images/logout.png'
import './style.css'
import IconButton from '../../../../components/icon-button/IconButton'

export default function ProfileSummary(props) {
  const {className, details} = props
  const history = useHistory()

  const doSignOut = useMemo(() => {
    return function() {
      signOut().then(() => {
        history.push('/')
        window.location.reload()
      })
    }
  }, [history])

  if (!details) return 'Loading...'

  const {avatar, name} = details

  return (
    <div className={`ProfileSummary ${className}`}>
      <IconButton className="signoutBtn" tooltip="Sign out" iconClass="signOutIcon" iconUrl={signOutIcon} onClick={doSignOut}/>
      <div className='userPropic' style={{backgroundImage: `url(${avatar || avatarIcon})`}}/>
      <label className='userfullname'>{name}</label>
      <label className='subtitle'>livepoll user</label>
    </div>
  )
}
