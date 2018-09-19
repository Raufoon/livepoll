import firebase from 'firebase/app';
import 'firebase/auth';
import getLivepollStore from "../../init/state-management";
import {actionSigninSuccess, actionSignoutSuccess} from "../../state-management/actions/auth-actions";
import {requestUserDataById} from "./user";

export const getLoggedInUser = () => firebase.auth().currentUser;

const signIn = (provider) => {
  return firebase.auth().signInWithPopup(provider);
};

export const signInWithGoogle = () => {
  return signIn(new firebase.auth.GoogleAuthProvider());
};

export const signOut = () => firebase.auth().signOut();

export const onUserSignedIn = (currentUser) => {
  requestUserDataById(currentUser.uid)
    .then(response => {
      getLivepollStore().dispatch(actionSigninSuccess(currentUser, response.user))
    });
};

export const onUserSignedout = () => {
  getLivepollStore().dispatch(actionSignoutSuccess());
};