import React from 'react'
import useHomeData from './hooks/useHomeData'
import { Link } from 'react-router-dom'
import Modal from '../../components/modal/Modal'
import useModal from '../../components/modal/hooks/useModal'

export default function HomePage () {
  console.log('Rendering HomePage')

  const [recentPolls] = useHomeData()
  const [isOpen1, openModal1, closeModal1] = useModal()
  const [isOpen2, openModal2, closeModal2] = useModal()

  return (
    <div>
      Recent Polls: <br/>
      {
        Object.values(recentPolls).map(poll => 
          <h2 key={poll.id}>
            <Link to={`/polls/${poll.id}`}>{poll.title}</Link>
          </h2>
        )
      }
    </div>
  )
}
