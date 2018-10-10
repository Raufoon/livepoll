import {onUserSignedout, signInWithEmailPass, signInWithGoogle, signOut} from "../../util/cloud/auth";
import {actionMakeWarningToast} from "./toast-actions";

export const ACTION_AUTH_LOADING = 'ACTION_AUTH_LOADING';
export const actionAuthLoading = () => ({
  type: ACTION_AUTH_LOADING
});

export const ACTION_STOP_AUTH_LOADING = 'ACTION_STOP_AUTH_LOADING';
export const actionStopAuthLoading = () => ({
  type: ACTION_STOP_AUTH_LOADING
});

export const actionSigninRequest = (method, data) => dispatch => {
  switch (method) {
    case 'GOOGLE':
      signInWithGoogle(dispatch);
      break;
    case 'EMAIL_PASS':
      signInWithEmailPass(dispatch, data.email, data.password);
      break;

    default:
  }
};

export const ACTION_SIGNIN_SUCCESS = 'ACTION_SIGNIN_SUCCESS';
export const actionSigninSuccess = (currentUser) => ({
  type: ACTION_SIGNIN_SUCCESS,
  currentUser
});

export const actionSignoutRequest = () => dispatch => {
  dispatch(actionMakeWarningToast('Signing Out...'));
  signOut().then(() => {
    onUserSignedout();
  });
};

export const ACTION_SIGNOUT_SUCCESS = 'ACTION_SIGNOUT_SUCCESS';
export const actionSignoutSuccess = () => ({
  type: ACTION_SIGNOUT_SUCCESS
});