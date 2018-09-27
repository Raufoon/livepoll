import firebase from 'firebase/app';
import 'firebase/auth';
import getLivepollStore from "../../init/state-management";
import {actionSigninSuccess, actionSignoutSuccess} from "../../state-management/actions/auth-actions";
import {requestCreateUser, requestUserDataById} from "./user";
import {actionMyProfileBasicInfoUpdateSuccess} from "../../state-management/actions/my-profile-actions";

export const getLoggedInUser = () => firebase.auth().currentUser;

export const signInWithGoogle = () => {
  return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
};

export const signInWithEmailPass = (email, pass) => {
  return firebase.auth()
    .createUserWithEmailAndPassword(email, pass)
    .catch(error => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return firebase.auth().signInWithEmailAndPassword(email, pass);
        default:
          return Promise.reject(error.code);
      }
    });
};

export const signOut = () => firebase.auth().signOut();

export const onUserSignedIn = (currentUser) => {
  requestUserDataById(currentUser.uid)
    .then(response => {
      if (!response.user) {
        return requestCreateUser()
          .then(() => ({
            user: {
              id: currentUser.uid
            }
          }))
          .catch((err)=>alert('Failed to create user'));
      }
      return response;
    })
    .then(response => {
      getLivepollStore().dispatch(actionSigninSuccess(currentUser));
      getLivepollStore().dispatch(actionMyProfileBasicInfoUpdateSuccess(response.user.basicInfo))
    });
};

export const onUserSignedout = () => {
  getLivepollStore().dispatch(actionSignoutSuccess());
};