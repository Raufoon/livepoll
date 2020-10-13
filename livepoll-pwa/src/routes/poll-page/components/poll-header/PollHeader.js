import React, {useContext, lazy, Suspense, useMemo} from 'react'
import UserBadge from '../user-badge/UserBadge'
import {useDispatch} from 'react-redux'
import AuthContext from '../../../../contexts/AuthContext'
import Modal from '../../../../components/modal/Modal'
import useModal from '../../../../components/modal/hooks/useModal'
import IconButton from '../../../../components/icon-button/IconButton'
import createIcon from './images/create-item.png'
import deleteIcon from './images/delete.png'
import usePollDetails from '../../hooks/usePollDetails'
import Reaktionsschnelle from 'reaktionsschnelle'
import './style.css'
import { actionDeletePoll } from '../../../../state-management/actions/poll-actions'
import DecisionModal from '../../../../components/decision-modal/DecisionModal'

const TextItemCreator = lazy(() => import('../text-item-creator/TextItemCreator'))
const AvatarTextItemCreator = lazy(() => import('../avatar-text-item-creator/AvatarTextItemCreator'))

export default function PollHeader(props) {
  const dispatch = useDispatch()
  const {pollId} = props
  const [showItemForm, openItemFormModal, closeItemFormModal] = useModal()
  const authUser = useContext(AuthContext)
  const details = usePollDetails(pollId)
  
  const deletePoll = useMemo(function() {
    return function() {
      dispatch(actionDeletePoll(pollId))
    }
  }, [dispatch, pollId])

  const [showPollDelete, openPollDeletion, closePollDeletion] = useModal()

  if (!details) return "Loading.."

  const authUserId = authUser.getUid()
  const {id, title, startDateTime, endDateTime, author, itemContentType, shouldShowVoters, usagePrivacy} = details
  
  if (!author) return "Loading..."

  const {name, avatar} = author
  const creationDateTime = new Date(parseInt(startDateTime, 10))
  const finishDateTime = endDateTime ? new Date(parseInt(endDateTime, 10)):null
  const shouldAllowAddItem = usagePrivacy === 'PROTECTED' ? author.id === authUserId: true
  const shouldAllowPollDelete = author.id === authUserId

  let ItemCreatorForm;
  if (itemContentType === 'TEXT') ItemCreatorForm = TextItemCreator
  else if (itemContentType === 'AVATAR_TEXT') ItemCreatorForm = AvatarTextItemCreator
  else if (itemContentType === 'IMAGE_CAPTION') ItemCreatorForm = AvatarTextItemCreator
  else return 'Loading...'

  const pollDeletionButton = shouldAllowPollDelete && <IconButton
    className='pollDeleteBtn'
    iconUrl={deleteIcon} 
    iconClass='addItemBtnIcon'
    onClick={openPollDeletion}>
    Delete This Poll
  </IconButton>

  return (
    <div className='PollHeader'>
      <label className='pollTitle'>{title}</label>

      <Reaktionsschnelle screens={['M', 'L']}>
        <div className="pollDesc">
          <span>Created by</span>&nbsp;
          <UserBadge className='pollCreator' name={name} avatar={avatar}/>
          &nbsp;on&nbsp; <b>{creationDateTime.toLocaleDateString()}</b> 
          &nbsp;at&nbsp; <b>{creationDateTime.toLocaleTimeString()}</b>
        </div>

        <div>{ usagePrivacy === 'PROTECTED' && <span>Only the author can create items here.</span>}</div>
        <div>{shouldShowVoters && <span>Voter list is visible! Click on the vote count.</span>}</div>
        <div>{
          endDateTime && (
            <span>
              Poll ends &nbsp;on&nbsp; <b>{finishDateTime.toLocaleDateString()}</b> &nbsp;at&nbsp; <b>{finishDateTime.toLocaleTimeString()}</b>
            </span>
          )
        }</div>
        
        <div className="actionPanel">
          {pollDeletionButton}

          {shouldAllowAddItem && <IconButton
            className='addItemBtn'
            iconUrl={createIcon} 
            iconClass='addItemBtnIcon' 
            onClick={openItemFormModal}>
              Create Item
            </IconButton>}
        </div>
      </Reaktionsschnelle>

      <Reaktionsschnelle screens={['S']}>
        {shouldAllowAddItem && <IconButton
          className='addItemBtnRound'
          iconUrl={createIcon} 
          iconClass='addItemBtnIcon' 
          onClick={openItemFormModal}/>}
      </Reaktionsschnelle>
      
      {
        shouldAllowAddItem && <Modal isOpen={showItemForm} onClose={closeItemFormModal}>
          <Suspense fallback='Loading form...'>
            <ItemCreatorForm pollId={id} itemContentType={itemContentType} onSubmit={closeItemFormModal}/>
          </Suspense>
        </Modal> 
      }

      <DecisionModal 
        isVisible={showPollDelete} 
        onNo={closePollDeletion} 
        onYes={deletePoll} 
        title="Are you sure to delete this poll? (Cannot be undone!)"/>
    </div>
  )
}
