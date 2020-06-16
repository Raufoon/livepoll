import firebase from 'firebase/app'
import 'firebase/auth'

export function createAuthUser (data) {
  if (!data) {
    return {
      isLoggedIn: false
    }
  }

  function AuthUser() {
    this.isLoggedIn = true
    this.data = data
    this.getName = function() {
      return this.data.displayName
    }
  }

  return new AuthUser()
}

export async function getAuthIDToken() {
  return await firebase.auth().currentUser.getIdToken()
}

export function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider)
}

export function signOut () {
  firebase.auth().signOut()
}