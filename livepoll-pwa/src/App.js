import React, {lazy, Suspense} from 'react'
import AuthContext from './contexts/AuthContext'
import WelcomePage from './routes/welcome-page/WelcomePage'
import useFirebaseAuth from './hooks/useFirebaseAuth'
import {Switch, Route} from 'react-router-dom'
import AppSidebar from './components/app-sidebar/AppSidebar'
import AppHeader from './components/app-header/AppHeader'
import './style.css'

const HomePage = lazy(() => import('./routes/home-page/HomePage'))
const ProfilePage = lazy(() => import('./routes/profile-page/ProfilePage'))
const PollPage = lazy(() => import('./routes/poll-page/PollPage'))

function App() {
  const authUser = useFirebaseAuth()

  if (!authUser) return "Loading..."

  if (!authUser.isLoggedIn) return <WelcomePage/>

  return (
    <AuthContext.Provider value={authUser}>
      <div className="App">
        <AppSidebar className="appSidebar"/>
        <div className="contentWithHeader">
          <AppHeader className="appHeader"/>
          <Suspense fallback="Loading...">
            <Switch>
                <Route path='/user/:id' component={ProfilePage}/>
                <Route path='/polls/:id' component={PollPage}/>
                <Route component={HomePage}/>
            </Switch>
          </Suspense>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App
