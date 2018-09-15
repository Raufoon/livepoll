import {signIn, signOut} from "../../util/auth/auth";

export const actionSigninRequest = () => dispatch => {
  signIn();
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