import {useState, useEffect} from 'react'
import { createAuthUser } from '../services/auth'
import firebase from 'firebase/app'
import 'firebase/auth'

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setAuthUser(createAuthUser(user))
      } else {
        setAuthUser(createAuthUser())
      }
    })
  }, [])

  return authUser
}