import {signInWithEmailPass, signInWithGoogle, signOut} from "../../util/cloud/auth";

export const actionSigninRequest = (method, data) => dispatch => {
  switch (method) {
    case 'GOOGLE':
      signInWithGoogle();
      break;

    case 'EMAIL_PASS':
      signInWithEmailPass(data.email, data.password);
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