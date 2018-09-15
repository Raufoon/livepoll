import {getAuthLock} from "./auth0";
import ROUTING_CONSTANTS from "../../constants/routing-constants";

export const signIn = () => {
  getAuthLock().show();
};

export const signOut = () => {
  getAuthLock().logout({
    returnTo: ROUTING_CONSTANTS.BASE_URL
  });
};