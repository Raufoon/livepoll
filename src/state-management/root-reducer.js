import {combineReducers} from 'redux'
import authRootReducer from "./reducers/auth-root-reducer";
import livepollRootReducer from "./reducers/livepoll/livepoll-root-reducer";
import myProfileRootReducer from "./reducers/my-profile-root-reducer";
import toastReducer from "./reducers/toast-reducer";

const rootReducer = combineReducers({
  auth: authRootReducer,
  polls: livepollRootReducer,
  myProfile: myProfileRootReducer,
  toast: toastReducer
});

export default rootReducer