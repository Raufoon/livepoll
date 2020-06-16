import React from 'react'
import AuthContext from './contexts/AuthContext'
import WelcomePage from './routes/welcome-page/WelcomePage'
import useFirebaseAuth from './hooks/useFirebaseAuth'
import {Switch, Route} from 'react-router-dom'
import HomePage from './routes/home-page/HomePage'

function App() {
  const authUser = useFirebaseAuth()

  if (!authUser) return "Loading..."

  return (
    <AuthContext.Provider value={authUser}>
      {!authUser.isLoggedIn && <WelcomePage/>}
      {
        authUser.isLoggedIn && <Switch>
          <Route component={HomePage}/>
        </Switch>
      }
    </AuthContext.Provider>
  );
}

export default App
