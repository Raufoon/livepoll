import getLivepollStore from "./state-management";
import {actionSigninSuccess, actionSignoutSuccess} from "../state-management/actions/auth-actions";
import {initAuth0} from "../util/auth/auth0";

const initAuth = () => {
  initAuth0();
};

export default initAuth