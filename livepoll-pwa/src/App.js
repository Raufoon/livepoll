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
      <Responsive screens={['M', 'L']}>
        <div className="App">
          <AppSidebar className="appSidebar"/>
          <div className="lmHeaderContent">
            {appHeader}
            <div className='content'>{routedPages}</div>
          </div>
        </div>
      </Responsive>

      <Responsive screens={['S']}>
        <div className="App AppMobile">
          {appHeader}
          <NavHeader/>
          <div className='content'>{routedPages}</div>
        </div>
      </Responsive>
    </AuthContext.Provider>
  );
}

export default App
