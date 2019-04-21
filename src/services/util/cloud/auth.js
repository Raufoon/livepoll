import firebase from 'firebase/app';
import 'firebase/auth';
import getLivepollStore from "../../../services/state-management";
import {
  actionSigninSuccess,
  actionSignoutSuccess
} from "../../../services/state-management/actions/auth-actions";
import {requestCreateUserWithOnlyId, requestUserDataById} from "./user";
import {actionMyProfileBasicInfoUpdateSuccess} from "../../../services/state-management/actions/my-profile-actions";
import {actionMakeErrorToast, actionMakeSuccessToast} from "../../../services/state-management/actions/toast-actions";
import {actionHideFullscrLoader} from "../../../services/state-management/actions/loader-actions";

export const getLoggedInUser = () => firebase.auth().currentUser;

export const signInWithGoogle = (dispatch) => {
  firebase.auth().signInWithPopup(
    new firebase.auth.GoogleAuthProvider()
  )
    .catch(() => {
      dispatch(actionMakeErrorToast('Could not sign in!'));
      dispatch(actionHideFullscrLoader());
    })
};

// I haven't added email verification yet since I needed to create some fake profiles first
export const signInWithEmailPass = (dispatch, email, pass) => {
  return firebase.auth()
    .createUserWithEmailAndPassword(email, pass)
    .catch(error => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return firebase.auth().signInWithEmailAndPassword(email, pass)
            .catch(() => {
              dispatch(actionHideFullscrLoader());
              dispatch(actionMakeErrorToast('Could not sign in!'));
            });

        default:
          dispatch(actionHideFullscrLoader());
          return Promise.reject(error.code);
      }
    });
};

export const signOut = () => {
  return firebase.auth().signOut();
};

export const onUserSignedIn = (currentUser) => {
  const dispatch = getLivepollStore().dispatch;
  localStorage.setItem('isLoggedIn', true);

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
            dispatch(actionMakeErrorToast('Failed To Create User'));
            dispatch(actionHideFullscrLoader());
            return Promise.reject('Failed to create user');
          });
      }
      return response;
    })
    .then(response => {
      dispatch(actionSigninSuccess(currentUser));
      dispatch(actionMakeSuccessToast('Successfully logged in'));
      dispatch(actionMyProfileBasicInfoUpdateSuccess(response.user.basicInfo))
      dispatch(actionHideFullscrLoader());
    });
};

export const onUserSignedout = () => {
  localStorage.clear();
  getLivepollStore().dispatch(actionSignoutSuccess());
};