import React, {useContext} from 'react'
import AuthContext from '../../contexts/AuthContext'
import useModal from '../modal/hooks/useModal'
import { signOut } from '../../services/auth'
import IconButton from '../icon-button/IconButton'
import Modal from '../modal/Modal'
import PollCreator from '../poll-creator/PollCreator'
import signoutIcon from './images/logout.png'
import createPollIcon from './images/create-poll.png'
import homeIcon from './images/home.png'
import './style.css'

export default function AppSidebar(props) {
  const {className} = props
  const authUser = useContext(AuthContext)
  const [showPollForm, openPollFormModal, closePollFormModal] = useModal()

  return (
    <div className={`AppSidebar ${className}`}>
      <IconButton 
        to={'/'}
        className="iconBtn"
        iconClass="icon"
        iconUrl={homeIcon}
        tooltip="Home"/>
      
      <IconButton 
        to={`/user/${authUser.getUid()}`}
        className="iconBtn"
        iconClass="icon profileNavImg"
        iconUrl={authUser.getAvatarUrl()}
        tooltip="Profile"/>
      
      <IconButton 
        className="iconBtn"
        iconClass="icon"
        onClick={openPollFormModal}
        iconUrl={createPollIcon}
        tooltip="Create Poll"/>

      <IconButton 
        className="iconBtn"
        iconClass="icon"
        iconUrl={signoutIcon}
        tooltip="Sign out" 
        onClick={signOut}/>

      <Modal isOpen={showPollForm} onClose={closePollFormModal} title="Poll Creation Form">
        <PollCreator onSubmit={closePollFormModal}/>
      </Modal>
    </div>
  )
}
