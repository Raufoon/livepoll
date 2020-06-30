import React, { lazy, Suspense } from 'react'
import IconButton from '../icon-button/IconButton'
import pollCreateIcon from './images/create-poll.png'
import useModal from '../modal/hooks/useModal'
import Modal from '../modal/Modal'
import './style.css'

const PollCreator = lazy(() => import('../poll-creator/PollCreator'))

export default function PollCreateFloatingButton() {
  const [showPollForm, openPollFormModal, closePollFormModal] = useModal()
  
  return (
    <>
      <IconButton className="PollCreateFloatingButton" onClick={openPollFormModal} iconClass="icon" iconUrl={pollCreateIcon}/>
      <Modal isOpen={showPollForm} onClose={closePollFormModal} title="Poll Creation Form">
        <Suspense fallback='Loading form...'>
          <PollCreator onSubmit={closePollFormModal}/>
        </Suspense>
      </Modal>
    </>
  )
}