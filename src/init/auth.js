import firebase from 'firebase/app'
import 'firebase/auth';
import getLivepollStore from "./state-management";
import {actionSigninSuccess, actionSignoutSuccess} from "../state-management/actions/auth-actions";

export const initAuthStateListener = () => {
  firebase.auth().onAuthStateChanged(currentUser => {
    if (currentUser) {
      getLivepollStore().dispatch(actionSigninSuccess(currentUser))
    } else {
      getLivepollStore().dispatch(actionSignoutSuccess())
    }
  });
};

const initAuth = () => {
  initAuthStateListener();
};

export default initAuth