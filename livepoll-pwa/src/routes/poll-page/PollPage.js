import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import usePollDetails from './hooks/usePollDetails'
import ItemCreator from './components/item-creator/ItemCreator'
import AuthContext from '../../contexts/AuthContext'
import usePollItems from './hooks/usePollitems'

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

  return (
    <div>
      this is a poll page <br/>
      {
        JSON.stringify(pollDetails)
      }
      <br/>
      <br/>
      <br/>

      {
        shouldAllowAddItem && <ItemCreator pollId={id}/> 
      }

      <h3>items:</h3>
      {
        pollItems && <h4>{JSON.stringify(pollItems)}</h4>
      }
    </div>
  )  
}