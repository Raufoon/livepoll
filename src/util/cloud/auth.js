import firebase from 'firebase/app';
import 'firebase/auth';

export const getLoggedInUser = () => firebase.auth().currentUser;

const signIn = (provider) => {
  return firebase.auth().signInWithPopup(provider);
};

export const signInWithGoogle = () => {
  return signIn(new firebase.auth.GoogleAuthProvider())
};

export const signOut = () => firebase.auth().signOut();