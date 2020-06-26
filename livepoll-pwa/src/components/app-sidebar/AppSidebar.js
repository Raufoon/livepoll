import React, {useContext, useMemo, lazy, Suspense} from 'react'
import AuthContext from '../../contexts/AuthContext'
import useModal from '../modal/hooks/useModal'
import { signOut } from '../../services/auth'
import IconButton from '../icon-button/IconButton'
import Modal from '../modal/Modal'
import signoutIcon from './images/logout.png'
import createPollIcon from './images/create-poll.png'
import homeIcon from './images/home.png'
import { useHistory } from "react-router-dom"
import DecisionModal from '../decision-modal/DecisionModal'
import './style.css'

const PollCreator = lazy(() => import('../poll-creator/PollCreator'))

export default function AppSidebar(props) {
  const {className} = props
  const history = useHistory()
  const authUser = useContext(AuthContext)
  const [showPollForm, openPollFormModal, closePollFormModal] = useModal()
  const [showSignoutPrompt, openSignoutPrompt, closeSignoutPrompt] = useModal()


  const doSignOut = useMemo(() => {
    return function() {
      signOut().then(() => {
        closeSignoutPrompt()
        history.push('/')
        window.location.reload()
      })
    }
  }, [history, closeSignoutPrompt])

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
        onClick={openSignoutPrompt}/>

      <Modal isOpen={showPollForm} onClose={closePollFormModal} title="Poll Creation Form">
        <Suspense fallback='Loading form...'>
          <PollCreator className="pollFormModal" onSubmit={closePollFormModal}/>
        </Suspense>
      </Modal>

      <DecisionModal 
        isVisible={showSignoutPrompt} 
        onNo={closeSignoutPrompt} 
        onYes={doSignOut} 
        title="Are you sure to sign out?"/>
    </div>
  )
}
