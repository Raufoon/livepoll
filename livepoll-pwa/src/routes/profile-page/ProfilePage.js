import React from 'react'
import {useParams, Switch, Route} from 'react-router-dom'
import useProfileDetails from './hooks/useProfileDetails'
import ProfileSummary from './components/profile-summary/ProfileSummary'
import ProfileSettings from './routes/profile-settings/ProfileSettings'
import Responsive from '../../components/responsive/Responsive'
import './style.css'

export default function ProfilePage(props) {
  console.log('Rendering ProfilePage')

  const {id} = useParams()
  const details = useProfileDetails(id)
  const {match} = props

  return (
    <div className='ProfilePage'>
      <Responsive screens={['M', 'L']}>
        <div className='leftSect'>
          <ProfileSummary className='profileSummary' details={details}/>
        </div>

        <div className='rightSect'>
          <Switch>
            <Route path={`${match.path}/settings`} component={ProfileSettings}/>
          </Switch>
        </div>
      </Responsive>

      <Responsive screens={['S']}>
        mobile screen :)
      </Responsive>      
    </div>
  )
}
