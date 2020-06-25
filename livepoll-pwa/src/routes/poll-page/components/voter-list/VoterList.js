import React from 'react'
import {useSelector} from 'react-redux'
import UserBadge from '../user-badge/UserBadge'
import './style.css'

export default function VoterList(props) {
  const {itemId, pollId} = props;
  const voters = useSelector(state => state.polls[pollId].items[itemId].voters) || []

  return (
    <div className='VoterList'>
      {
        voters.map(voter => {
          const {id, name, avatar} = voter
          return <UserBadge name={name} key={id} avatar={avatar}/>
        })
      }
    </div>
  )
}
