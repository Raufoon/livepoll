import React from 'react'
import {useParams} from 'react-router-dom'
import usePollDetails from './hooks/usePollDetails'

export default function PollPage () {
  console.log('Rendering PollPage')
  const {id} = useParams()
  const pollDetails = usePollDetails(id)

  return (
    <div>
      this is a poll page <br/>
      {
        JSON.stringify(pollDetails)
      }
    </div>
  )  
}
