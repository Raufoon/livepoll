import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import usePollDetails from './hooks/usePollDetails'
import TextItemCreator from './components/text-item-creator/TextItemCreator'
import AvatarTextItemCreator from './components/avatar-text-item-creator/AvatarTextItemCreator'
import AuthContext from '../../contexts/AuthContext'
import usePollItems from './hooks/usePollitems'
import ItemsPanel from './components/items-panel/ItemsPanel'
import PollHeader from './components/poll-header/PollHeader'
import './style.css'

export default function PollPage () {
  console.log('Rendering PollPage')
  const {id} = useParams()
  const pollDetails = usePollDetails(id)
  const authUser = useContext(AuthContext)
  const pollItems = usePollItems(id)

  if (!pollDetails) return "Loading..." 

  const authUserId = authUser.getUid()
  const {usagePrivacy, author} = pollDetails

  const shouldAllowAddItem = usagePrivacy === 'PROTECTED' ? author.id === authUserId: true

  let ItemCreatorForm;
  switch(pollDetails.itemContentType) {
    case 'TEXT':
      ItemCreatorForm = TextItemCreator
      break
    
    case 'AVATAR_TEXT':
      ItemCreatorForm = AvatarTextItemCreator
      break
    
    default:
      return "Loading..."
  }

  return (
    <div className='PollPage'>
      <PollHeader details={pollDetails}/>
      
      <main>
        {
          pollItems && <ItemsPanel
            className='itemsPanel'
            pollId={id}
            details={pollDetails} 
            items={Object.values(pollItems)}/>
        }

        <div className="rightPanel">
          {
            shouldAllowAddItem && <ItemCreatorForm pollId={id}/> 
          }
        </div>
      </main>
    </div>
  )  
}
