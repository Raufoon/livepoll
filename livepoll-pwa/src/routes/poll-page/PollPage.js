import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import usePollDetails from './hooks/usePollDetails'
import usePollItems from './hooks/usePollitems'
import ItemsPanel from './components/items-panel/ItemsPanel'
import PollHeader from './components/poll-header/PollHeader'
import useModal from '../../components/modal/hooks/useModal'
import Modal from '../../components/modal/Modal'
import './style.css'
import { actionFetchVoterList } from '../../state-management/actions/poll-actions'

export default function PollPage () {
  console.log('Rendering PollPage')

  const [votersVisible, showVotersModal, hideVotersModal] = useModal()
  const [itemIdForVoterList, setItemIdForVoterList] = useState(false)
  
  const {id} = useParams()
  const pollDetails = usePollDetails(id)
  const pollItems = usePollItems(id)
  const dispath = useDispatch()

  function displayVoterList(itemId) {
    showVotersModal()
    if(!pollItems[itemId].voters) {
      dispath(actionFetchVoterList(id, itemId))
    }
    setItemIdForVoterList(itemId)
  }

  if (!pollDetails) return "Loading..." 
  
  return (
    <div className='PollPage'>
      <PollHeader details={pollDetails}/>
      
      <main>
        {
          pollItems && <ItemsPanel
            className='itemsPanel'
            pollId={id}
            details={pollDetails} 
            displayVoterList={displayVoterList}
            items={Object.values(pollItems)}/>
        }

        <div className="rightPanel">    
          <span>&nbsp;</span>  
        </div>
      </main>

      <Modal isOpen={votersVisible} onClose={hideVotersModal}>
        <div>
          {
            itemIdForVoterList
          }
        </div>
      </Modal>
    </div>
  )  
}
