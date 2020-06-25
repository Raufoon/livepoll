import React, {useContext} from 'react'
import UserBadge from '../user-badge/UserBadge'
import AuthContext from '../../../../contexts/AuthContext'
import TextItemCreator from '../text-item-creator/TextItemCreator'
import AvatarTextItemCreator from '../avatar-text-item-creator/AvatarTextItemCreator'
import Modal from '../../../../components/modal/Modal'
import useModal from '../../../../components/modal/hooks/useModal'
import IconButton from '../../../../components/icon-button/IconButton'
import createIcon from './images/create-item.png'
import usePollDetails from '../../hooks/usePollDetails'
import './style.css'

export default function PollHeader(props) {
  console.log('Rendering PollHeader')

  const {pollId} = props
  const [showItemForm, openItemFormModal, closeItemFormModal] = useModal()
  const authUser = useContext(AuthContext)

  const details = usePollDetails(pollId)

  if (!details) return "Loading.."

  const authUserId = authUser.getUid()
  const {id, title, startDateTime, author, itemContentType, usagePrivacy} = details
  
  if (!author) return "Loading..."

  const {name, avatar} = author
  const creationDateTime = new Date(parseInt(startDateTime, 10))
  const shouldAllowAddItem = usagePrivacy === 'PROTECTED' ? author.id === authUserId: true

  let ItemCreatorForm;
  if (itemContentType === 'TEXT') ItemCreatorForm = TextItemCreator
  else if (itemContentType === 'AVATAR_TEXT') ItemCreatorForm = AvatarTextItemCreator
  else return 'Loading...'

  return (
    <div className='PollHeader'>
      <label className='row pollTitle'>{title}</label>
      
      <div className="row pollDesc">
        <span>Created by</span>
        &nbsp;
        <UserBadge name={name} avatar={avatar}/>
        &nbsp;on&nbsp; 
        <b>{creationDateTime.toLocaleDateString()}</b> 
        &nbsp;at&nbsp;
        <b>{creationDateTime.toLocaleTimeString()}</b>
      </div>
      
      <div className="row">
        <IconButton
         className='addItemBtn'
         iconUrl={createIcon} 
         iconClass='addItemBtnIcon' 
         onClick={openItemFormModal}>
           Create Item
        </IconButton>
      </div>
      
      {
        shouldAllowAddItem && <Modal isOpen={showItemForm} onClose={closeItemFormModal}>
          <ItemCreatorForm pollId={id} onSubmit={closeItemFormModal}/>
        </Modal> 
      }
    </div>
  )
}
