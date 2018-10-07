import firebase from 'firebase/app';
import 'firebase/auth';
import getLivepollStore from "../../init/state-management";
import {actionSigninSuccess, actionSignoutSuccess} from "../../state-management/actions/auth-actions";
import {requestCreateUserWithOnlyId, requestUserDataById} from "./user";
import {actionMyProfileBasicInfoUpdateSuccess} from "../../state-management/actions/my-profile-actions";
import {actionMakeErrorToast, actionMakeSuccessToast} from "../../state-management/actions/toast-actions";

export const getLoggedInUser = () => firebase.auth().currentUser;

export const signInWithGoogle = () => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() =>
      firebase.auth().signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      )
    );
};

// I haven't added email verification yet since I needed to create some fake profiles first
export const signInWithEmailPass = (email, pass) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
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
    })
};

export const signOut = () => firebase.auth().signOut();

export const onUserSignedIn = (currentUser) => {
  requestUserDataById(currentUser.uid)
    .then(response => {
      if (!response.user) {
        return requestCreateUserWithOnlyId()
          .then(() => ({
            user: {
              id: currentUser.uid
            }
          }))
          .catch(() => {
            getLivepollStore().dispatch(actionMakeErrorToast('Failed To Create User'));
            return Promise.reject('Failed to create user');
          });
      }
      return response;
    })
    .then(response => {
      getLivepollStore().dispatch(actionSigninSuccess(currentUser));
      getLivepollStore().dispatch(actionMakeSuccessToast('Successfully logged in'));
      getLivepollStore().dispatch(actionMyProfileBasicInfoUpdateSuccess(response.user.basicInfo))
    });
};

export const onUserSignedout = () => {
  localStorage.clear();
  getLivepollStore().dispatch(actionSignoutSuccess());
};