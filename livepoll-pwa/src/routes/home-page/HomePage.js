import React from 'react'
import useHomeData from './hooks/useHomeData'
import { Link } from 'react-router-dom'
import Responsive from '../../components/responsive/Responsive'
import './style.css'
import PollCard from './components/poll-card/PollCard'

export default function HomePage () {
  console.log('Rendering HomePage')

  const [recentPolls] = useHomeData()

  const polls = Object.values(recentPolls)
  const pollOfTheDayIdx = parseInt(Math.random() * (polls.length - 1), 10)
  const pollOfTheDay = polls[pollOfTheDayIdx]

  return (
    <>
    <Responsive screens={['M', 'L']}>
      <div className='Home M'>
        <div className="recent">
          <div className="sectionLabel">RECENT</div>
          {
            polls.map(function(poll) {
              return <PollCard className='pollCard' key={poll.id} {...poll}/>
            })
          }
        </div>

        <div className="trending">
          <div className="sectionLabel">TRENDING</div>
          {
            polls.map(function(poll) {
              return <PollCard className='pollCard' key={poll.id} {...poll}/>
            })
          }
        </div>

        <div className="popular">
          <div className="sectionLabel">MOST HITS</div>
          {
            polls.map(function(poll) {
              return <PollCard className='pollCard' key={poll.id} {...poll}/>
            })
          }
        </div>
      </div>
    </Responsive>
      
    </>
  )
}
