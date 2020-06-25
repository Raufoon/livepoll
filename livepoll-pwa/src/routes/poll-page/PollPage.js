import React, {useState, useMemo} from 'react'
import {useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import usePollDetails from './hooks/usePollDetails'
import usePollItems from './hooks/usePollitems'
import ItemsPanel from './components/items-panel/ItemsPanel'
import PollHeader from './components/poll-header/PollHeader'
import useModal from '../../components/modal/hooks/useModal'
import Modal from '../../components/modal/Modal'
import { actionFetchVoterList } from '../../state-management/actions/poll-actions'
import './style.css'
import VoterList from './components/voter-list/VoterList'

export default function PollPage () {
  console.log('Rendering PollPage')

  const [votersVisible, showVotersModal, hideVotersModal] = useModal()
  const [itemIdForVoterList, setItemIdForVoterList] = useState(false)
  
  const {id} = useParams()
  const pollDetails = usePollDetails(id)
  const pollItems = usePollItems(id)
  const dispath = useDispatch()

  const displayVoterList = useMemo(() => {
    return function (itemId) {
      showVotersModal()
      dispath(actionFetchVoterList(id, itemId))
      setItemIdForVoterList(itemId)
    } 
  }, [dispath, id, showVotersModal])

  const hideVoterList = useMemo(() => {
    return function (itemId) {
      hideVotersModal()
      setItemIdForVoterList(false)
    } 
  }, [hideVotersModal])

  if (!pollDetails) return "Loading..." 
  
  return (
    <div className='PollPage'>
      <PollHeader pollId={id}/>
      
      <main>
        {
          pollItems && <ItemsPanel
            className='itemsPanel'
            pollId={id}
            displayVoterList={displayVoterList}
            items={Object.values(pollItems)}/>
        }

        <div className="rightPanel">    
          <span>&nbsp;</span>  
        </div>
      </main>

      <Modal isOpen={votersVisible} onClose={hideVoterList}>
        {itemIdForVoterList && <VoterList pollId={id} itemId={itemIdForVoterList}/>}
      </Modal>
    </div>
  )  
}
