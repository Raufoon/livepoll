import React, {lazy, Suspense} from 'react'
import AuthContext from './contexts/AuthContext'
import WelcomePage from './routes/welcome-page/WelcomePage'
import useFirebaseAuth from './hooks/useFirebaseAuth'
import {Switch, Route} from 'react-router-dom'
import AppSidebar from './components/app-sidebar/AppSidebar'
import AppHeader from './components/app-header/AppHeader'
import Responsive from './components/responsive/Responsive'
import NavHeader from './components/nav-header/NavHeader'
import './style.css'

const HomePage = lazy(() => import('./routes/home-page/HomePage'))
const ProfilePage = lazy(() => import('./routes/profile-page/ProfilePage'))
const PollPage = lazy(() => import('./routes/poll-page/PollPage'))

function App() {
  const authUser = useFirebaseAuth()

  if (!authUser) return "Loading..."
  if (!authUser.isLoggedIn) return <WelcomePage/>

  // viewparts
  const appHeader = <AppHeader className="appHeader"/>
  const routedPages = <Suspense fallback="Loading...">
    <Switch>
        <Route path='/user/:id' component={ProfilePage}/>
        <Route path='/polls/:id' component={PollPage}/>
        <Route component={HomePage}/>
    </Switch>
  </Suspense>

  return (
    <AuthContext.Provider value={authUser}>
      <div className="App">

        <Responsive screens={['M', 'L']}>
          <AppSidebar className="appSidebar"/>

          <div className="lmScreenContent">
            {appHeader}
            {routedPages}
          </div>
        </Responsive>

        <Responsive screens={['S']}>
          <div className="sScreenContent">
            {appHeader}
            <NavHeader/>
            {routedPages}
          </div>
        </Responsive>
      </div>
    </AuthContext.Provider>
  );
}

export default App
