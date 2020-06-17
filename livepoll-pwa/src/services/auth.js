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
    this.getUid = function() {
      return this.data.uid
    }
  }

  return new AuthUser()
}

export async function getAuthIDToken() {
  const token = await firebase.auth().currentUser.getIdToken()
  return token
}

export function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider)
}

export function signOut () {
  firebase.auth().signOut()
}