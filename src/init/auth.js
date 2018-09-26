import firebase from 'firebase/app'
import 'firebase/auth';
import {onUserSignedIn, onUserSignedout} from "../util/cloud/auth";

export const initAuthStateListener = () => {
  // firebase.auth().signOut()
  firebase.auth().onAuthStateChanged(currentUser => {
    if (currentUser) onUserSignedIn(currentUser);
    else onUserSignedout();
  });
};

const initAuth = () => {
  initAuthStateListener();
};

export default initAuth