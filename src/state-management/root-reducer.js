import {combineReducers} from 'redux'
import authReducer from "./reducers/auth-reducer";
import livepollReducer from "./reducers/livepoll-reducer";
import myProfileReducer from "./reducers/my-profile-reducer";
import toastReducer from "./reducers/toast-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  polls: livepollReducer,
  myProfile: myProfileReducer,
  toast: toastReducer
});

export default rootReducer