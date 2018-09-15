/*
When a user logs in, Auth0 returns three items:

access_token: to learn more, see the Access Token documentation
id_token: to learn more, see the ID Token documentation
expires_in: the number of seconds before the Access Token expires
* */

import Auth0Lock from 'auth0-lock';
import getLivepollStore from "../../init/state-management";
import {actionSigninSuccess} from "../../state-management/actions/auth-actions";

const AUTH0_DOMAIN = 'mraufoon.auth0.com';
const AUTH0_CLIENT_ID = 'XqJRwa2m3MeELngwWFw7b9OCg8p6vUyY';

let auth0Lock;

const onAuthenticated = (authResult) => {
  auth0Lock.getUserInfo(authResult.accessToken, (error, profile) => {
    if (error) {
      alert('Unsuccessful authentication');
      return;
    }
    getLivepollStore().dispatch(actionSigninSuccess({
      accessToken: authResult.accessToken
    }))
  });
};

export const initAuth0 = () => {
  auth0Lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);
  auth0Lock.on('authenticated', onAuthenticated);
};


export const getAuthLock = () => auth0Lock;