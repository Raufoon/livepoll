import React from 'react'
import useHomeData from './hooks/useHomeData'
import { Link } from 'react-router-dom'
import Responsive from '../../components/responsive/Responsive'
import './style.css'
import PollCard from './components/poll-card/PollCard'
import SpecialPollCard from './components/special-poll-card/SpecialPollCard'

export default function HomePage () {
  console.log('Rendering HomePage')

  const [recentPolls] = useHomeData()

  const polls = Object.values(recentPolls)
  if (!polls.length) return "Loading..."

  const pollOfTheDayIdx = parseInt(Math.random() * (polls.length - 1), 10)
  const pollOfTheDay = polls[4]

  return (
    <>
    <Responsive screens={['M', 'L']}>
      <div className='Home M'>
        <div className="trending">
          <div className="sectionLabel">TRENDING</div>
          <div className="content">
            <SpecialPollCard className='pollCard' poll={pollOfTheDay}/>
            {
              polls.map(function(poll) {
                return <PollCard className='pollCard' key={poll.id} {...poll}/>
              })
            }
          </div>
        </div>

        <div className="recent">
          <div className="sectionLabel">RECENT</div>
          <div className="content">
            {
              polls.map(function(poll) {
                return <PollCard className='pollCard' key={poll.id} {...poll}/>
              })
            }
          </div>
        </div>

        <div className="popular">
          <div className="sectionLabel">MOST HITS</div>
          <div className="content">
            {
              polls.map(function(poll) {
                return <PollCard className='pollCard' key={poll.id} {...poll}/>
              })
            }
          </div>
        </div>
      </div>
    </Responsive>
      
    </>
  )
}
