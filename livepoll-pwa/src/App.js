import React from 'react'
import AuthContext from './contexts/AuthContext'
import WelcomePage from './routes/welcome-page/WelcomePage'
import useFirebaseAuth from './hooks/useFirebaseAuth'
import {Switch, Route} from 'react-router-dom'
import HomePage from './routes/home-page/HomePage'
import ProfilePage from './routes/profile-page/ProfilePage'
import AppHeader from './components/app-header/AppHeader'
import PollCreator from './routes/poll-creator/PollCreator'

function App() {
  const authUser = useFirebaseAuth()

  if (!authUser) return "Loading..."

  if (!authUser.isLoggedIn) return <WelcomePage/>

  return (
    <AuthContext.Provider value={authUser}>
      <AppHeader/>
      <Switch>
          <Route path='/user/:id' component={ProfilePage}/>
          <Route path='/create' component={PollCreator}/>
          <Route component={HomePage}/>
      </Switch>
    </AuthContext.Provider>
  );
}

export default App
