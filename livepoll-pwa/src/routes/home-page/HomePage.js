import React from 'react'
import useHomeData from './hooks/useHomeData'
import { Switch, Route } from 'react-router-dom'
import Reaktionsschnelle from 'reaktionsschnelle'
import PollCard from '../../components/poll-card/PollCard'
import SpecialPollCard from '../../components/special-poll-card/SpecialPollCard'
import './style.css'

function shuffleArray(array) {
  let shuffled = array.slice()
  for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
  }
  return shuffled
}

export default function HomePage () {
  const [recentPolls] = useHomeData()

  const polls = Object.values(recentPolls)
  if (!polls.length) return "Loading..."

  const pollOfTheDayIdx = parseInt(Math.random() * (polls.length - 1), 10)
  const pollOfTheDay = polls[pollOfTheDayIdx]

  const trendingPollsList = (
    polls.map(function(poll) {
      return <PollCard className='pollCard' key={poll.id} {...poll}/>
    })
  )
  const topPollsList = (
    shuffleArray(polls).map(function(poll) {
      return <PollCard className='pollCard' key={poll.id} {...poll}/>
    })
  )
  const recentPollsList = (
    shuffleArray(polls).map(function(poll) {
      return <PollCard className='pollCard' key={poll.id} {...poll}/>
    })
  )

  const trendingSection = (
    <div className="trending">
      <div className="sectionLabel">TRENDING</div>
      <div className="content">
        <SpecialPollCard className='pollCard' poll={pollOfTheDay}/>
        {trendingPollsList}
      </div>
    </div>
  )

  const recentSection = (
    <div className="recent">
      <div className="sectionLabel">RECENT</div>
        <div className="content">
        {recentPollsList}
      </div>
    </div>
  )

  const popularSection = (
    <div className="popular">
      <div className="sectionLabel">MOST HITS</div>
        <div className="content">
        {topPollsList}
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
    <Reaktionsschnelle minWidth={1400}>
      <div className='Home M'>
        {trendingSection}
        {recentSection}
        {popularSection}
      </div>
    </Reaktionsschnelle>

    <Reaktionsschnelle minWidth={1080} maxWidth={1399}>
      <div className='Home S'>
        {trendingSection}
        {recentSection}
      </div>
    </Reaktionsschnelle>

    <Reaktionsschnelle minWidth={870} maxWidth={1079}>
      <div className='Home XS'>
        {trendingSection}
        {recentSection}
      </div>
    </Reaktionsschnelle>

    <Reaktionsschnelle minWidth={1} maxWidth={869}>
      <div className='Home XXS'>
        {routedSections}
      </div>
    </Reaktionsschnelle>
      
    </>
  )
}
