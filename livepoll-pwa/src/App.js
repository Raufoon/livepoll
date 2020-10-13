import React, {lazy, Suspense} from 'react'
import AuthContext from './contexts/AuthContext'
import useFirebaseAuth from './hooks/useFirebaseAuth'
import {Switch, Route} from 'react-router-dom'
import AppSidebar from './components/app-sidebar/AppSidebar'
import AppHeader from './components/app-header/AppHeader'
import Reaktionsschnelle from 'reaktionsschnelle'
import NavHeader from './components/nav-header/NavHeader'
import './style.css'

const HomePage = lazy(() => import('./routes/home-page/HomePage'))
const ProfilePage = lazy(() => import('./routes/profile-page/ProfilePage'))
const PollPage = lazy(() => import('./routes/poll-page/PollPage'))
const WelcomePage = lazy(() => import('./routes/welcome-page/WelcomePage'))
const MobileWelcomePage = lazy(() => import('./routes/mobile-welcome-page/MobileWelcomePage'))
const PollCreateFloatingButton = lazy(() => import('./components/poll-create-floating-button/PollCreateFlotingButton'))

function App() {
  const authUser = useFirebaseAuth()

  if (!authUser) return "Loading..."

  if (!authUser.isLoggedIn) return <>
    <Suspense fallback="Loading...">
      <Reaktionsschnelle screens={['M', 'L']}>
        <WelcomePage/>
      </Reaktionsschnelle>
      <Reaktionsschnelle screens={['S']}>
        <MobileWelcomePage/>
      </Reaktionsschnelle>
    </Suspense>
  </>

  const routedPages = <Suspense fallback="Loading...">
    <Switch>
        <Route path='/user/:id' component={ProfilePage}/>
        <Route path='/polls/:id' component={PollPage}/>
        <Route component={HomePage}/>
    </Switch>
  </Suspense>

  return (
    <AuthContext.Provider value={authUser}>
      <div className='App'>        
        <Reaktionsschnelle screens={['M', 'L']}>
          <AppHeader className='appHeader withSidebar'/>
          <AppSidebar className="sidebar"/>
          <main className='withSidebar'>
            {routedPages}
          </main>
        </Reaktionsschnelle>
        
        <Reaktionsschnelle screens={['S']}>
          <AppHeader className='appHeader'/>
          <NavHeader className="navHeader"/>
          <main>
            {routedPages}
          </main>
          <Suspense fallback="">
            <PollCreateFloatingButton/>
          </Suspense>
        </Reaktionsschnelle>
      </div>
    </AuthContext.Provider>
  );
}

export default App
