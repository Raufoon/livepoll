import React from 'react'
import useHomeData from './hooks/useHomeData'
import { Link, Switch, Route, NavLink } from 'react-router-dom'
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
  const pollOfTheDay = polls[pollOfTheDayIdx]

  const pollList = (
    polls.map(function(poll) {
      return <PollCard className='pollCard' key={poll.id} {...poll}/>
    })
  )

  const trendingSection = (
    <div className="trending">
      <div className="sectionLabel">TRENDING</div>
      <div className="content">
        <SpecialPollCard className='pollCard' poll={pollOfTheDay}/>
        {pollList}
      </div>
    </div>
  )

  const recentSection = (
    <div className="recent">
      <div className="sectionLabel">RECENT</div>
        <div className="content">
        {pollList}
      </div>
    </div>
  )

  const popularSection = (
    <div className="popular">
      <div className="sectionLabel">MOST HITS</div>
        <div className="content">
        {pollList}
      </div>
    </div>
  )

  const routedSections = (
    <Switch>
      <Route exact path='/recent' render={() => recentSection}/>
      <Route exact path='/popular' render={() => popularSection}/>
      <Route exact path='/trending' render={() => trendingSection}/>
      <Route exact path='/' render={() => trendingSection}/>
    </Switch>
  )

  return (
    <>
    <Responsive minWidth={1400}>
      <div className='Home M'>
        {trendingSection}
        {recentSection}
        {popularSection}
      </div>
    </Responsive>

    <Responsive minWidth={1080} maxWidth={1399}>
      <div className='Home S'>
        {trendingSection}
        {recentSection}
      </div>
    </Responsive>

    <Responsive minWidth={870} maxWidth={1079}>
      <div className='Home XS'>
        {trendingSection}
        {recentSection}
      </div>
    </Responsive>

    <Responsive minWidth={1} maxWidth={869}>
      <div className='Home XXS'>
        {routedSections}
      </div>
    </Responsive>
      
    </>
  )
}
