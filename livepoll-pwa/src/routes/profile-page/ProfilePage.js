import React,{useContext} from 'react'
import {useParams, Switch, Route} from 'react-router-dom'
import useProfileDetails from './hooks/useProfileDetails'
import ProfileSummary from './components/profile-summary/ProfileSummary'
import ProfileSettings from './routes/profile-settings/ProfileSettings'
import Reaktionsschnelle from 'reaktionsschnelle'
import IconButton from '../../components/icon-button/IconButton'
import activityIcon from './images/activity.png'
import pollsIcon from './images/polls.png'
import settingsIcon from './images/settings.png'
import AuthContext from '../../contexts/AuthContext'
import useHomeData from '../home-page/hooks/useHomeData'
import PollCard from '../../components/poll-card/PollCard'
import './style.css'

export default function ProfilePage(props) {
  const {id} = useParams()
  const details = useProfileDetails(id)
  const authUser = useContext(AuthContext)
  const [recentPolls] = useHomeData()
  
  const myPolls = (
    Object.values(recentPolls).map(function(poll) {
      return <PollCard className='pollCard' key={poll.id} {...poll}/>
    })
  )

  const {match} = props
  const isMyProfile = authUser.getUid() === id

  const navButtons = <>
    <IconButton 
      to={`${match.url}/activity`} 
      activeClassName='activeNavBtn' 
      iconClass='icon' 
      iconUrl={activityIcon}>Activity</IconButton>   
    <IconButton 
      to={`${match.url}/polls`} 
      activeClassName='activeNavBtn' 
      iconClass='icon' 
      iconUrl={pollsIcon}>Polls</IconButton> 
    {
      isMyProfile && <IconButton 
        to={`${match.url}/settings`} 
        iconClass='icon' 
        activeClassName='activeNavBtn' 
        iconUrl={settingsIcon}>Settings</IconButton>
    }
  </>

  function renderMyPolls() {
    return <div className="myPolls">
      <div className="sectionLabel">Polls by {authUser.getName()}</div>
      <div className="content">
        {myPolls}
      </div>
    </div>
  }

  return (
    <div className='ProfilePage'>
      <Reaktionsschnelle screens={['M', 'L']}>
        <div className='leftSect'>
          <ProfileSummary className='profileSummary' details={details}/>
          <div className="profileNav">
            {navButtons}
          </div>
        </div>

        <div className='rightSect'>
          <Switch>
            <Route path={`${match.path}/settings`} component={ProfileSettings}/>
            <Route path={`${match.path}/polls`} render={renderMyPolls}/>
          </Switch>
        </div>
      </Reaktionsschnelle>

      <Reaktionsschnelle screens={['S']}>
        <div className="mobile">
          <ProfileSummary className='profileSummary' details={details}/>
          <div className="profileNav">
            {navButtons}
          </div>
          <Switch>
            <Route path={`${match.path}/settings`} component={ProfileSettings}/>
            <Route path={`${match.path}/polls`} render={renderMyPolls}/>
          </Switch>
        </div>
      </Reaktionsschnelle>      
    </div>
  )
}
