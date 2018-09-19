import {signInWithGoogle, signOut} from "../../util/cloud/auth";

export const actionSigninRequest = (method) => dispatch => {
  switch (method) {
    case 'GOOGLE':
      signInWithGoogle();
      break;

    default:
  }
};

export const ACTION_SIGNIN_SUCCESS = 'ACTION_SIGNIN_SUCCESS';
export const actionSigninSuccess = (currentUser, userData) => ({
  type: ACTION_SIGNIN_SUCCESS,
  currentUser,
  userData
});

export const actionSignoutRequest = () => dispatch => signOut();

export const ACTION_SIGNOUT_SUCCESS = 'ACTION_SIGNOUT_SUCCESS';
export const actionSignoutSuccess = () => ({
  type: ACTION_SIGNOUT_SUCCESS
});