import React from 'react'
import {useParams} from 'react-router-dom'
import usePollDetails from './hooks/usePollDetails'
import usePollItems from './hooks/usePollitems'
import ItemsPanel from './components/items-panel/ItemsPanel'
import PollHeader from './components/poll-header/PollHeader'
import './style.css'

export default function PollPage () {
  console.log('Rendering PollPage')
  
  const {id} = useParams()
  const pollDetails = usePollDetails(id)
  const pollItems = usePollItems(id)
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
            items={Object.values(pollItems)}/>
        }

        <div className="rightPanel">    
          <span>&nbsp;</span>  
        </div>
      </main>
    </div>
  )  
}
