import React, {useContext, lazy, Suspense} from 'react'
import UserBadge from '../user-badge/UserBadge'
import AuthContext from '../../../../contexts/AuthContext'
import Modal from '../../../../components/modal/Modal'
import useModal from '../../../../components/modal/hooks/useModal'
import IconButton from '../../../../components/icon-button/IconButton'
import createIcon from './images/create-item.png'
import usePollDetails from '../../hooks/usePollDetails'
import Responsive from '../../../../components/responsive/Responsive'
import './style.css'

const TextItemCreator = lazy(() => import('../text-item-creator/TextItemCreator'))
const AvatarTextItemCreator = lazy(() => import('../avatar-text-item-creator/AvatarTextItemCreator'))

export default function PollHeader(props) {
  console.log('Rendering PollHeader')

  const {pollId} = props
  const [showItemForm, openItemFormModal, closeItemFormModal] = useModal()
  const authUser = useContext(AuthContext)

  const details = usePollDetails(pollId)

  if (!details) return "Loading.."

  const authUserId = authUser.getUid()
  const {id, title, startDateTime, author, itemContentType, shouldShowVoters, usagePrivacy} = details
  
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
      <label className='pollTitle'>{title}</label>

      <Responsive screens={['M', 'L']}>
      <div className="pollDesc">
        <span>Created by</span>
        &nbsp;
        <UserBadge className='pollCreator' name={name} avatar={avatar}/>
        &nbsp;on&nbsp; 
        <b>{creationDateTime.toLocaleDateString()}</b> 
        &nbsp;at&nbsp;
        <b>{creationDateTime.toLocaleTimeString()}</b>
      </div>

      <div>
        {
          usagePrivacy === 'PROTECTED' && <span>Only the author can create items here.</span>
        }
      </div>

      <div>
        {
          shouldShowVoters && <span>Voter list is visible! Click on the vote count.</span>
        }
      </div>
      
      <div>
        <IconButton
         className='addItemBtn'
         iconUrl={createIcon} 
         iconClass='addItemBtnIcon' 
         onClick={openItemFormModal}>
           Create Item
        </IconButton>
      </div>
      </Responsive>
      
      {
        shouldAllowAddItem && <Modal isOpen={showItemForm} onClose={closeItemFormModal}>
          <Suspense fallback='Loading form...'>
            <ItemCreatorForm pollId={id} onSubmit={closeItemFormModal}/>
          </Suspense>
        </Modal> 
      }
    </div>
  )
}
