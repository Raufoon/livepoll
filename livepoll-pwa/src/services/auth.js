import firebase from 'firebase/app'
import 'firebase/auth'

export function createAuthUser (data) {
  if (!data) {
    return {
      isLoggedIn: false
    }
  }
  return {
    isLoggedIn: true,
    ...data
  }
}

export function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider)
}

export function signOut () {
  firebase.auth().signOut()
}