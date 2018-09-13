import {signInWithGoogle, signOut} from "../../util/auth";

export const actionSigninRequest = (method) => dispatch => {
  switch (method) {
    case 'GOOGLE':
      signInWithGoogle();
      break;

    default:
  }
};

export const ACTION_SIGNIN_SUCCESS = 'ACTION_SIGNIN_SUCCESS';
export const actionSigninSuccess = (currentUser) => ({
  type: ACTION_SIGNIN_SUCCESS,
  currentUser
});

export const actionSignoutRequest = () => dispatch => signOut();

export const ACTION_SIGNOUT_SUCCESS = 'ACTION_SIGNOUT_SUCCESS';
export const actionSignoutSuccess = () => ({
  type: ACTION_SIGNOUT_SUCCESS
});