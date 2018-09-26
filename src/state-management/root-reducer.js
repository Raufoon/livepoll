import {combineReducers} from 'redux'
import authRootReducer from "./reducers/auth/auth-root-reducer";
import livepollRootReducer from "./reducers/livepoll/livepoll-root-reducer";
import myProfileRootReducer from "./reducers/my-profile/my-profile-root-reducer";

const rootReducer = combineReducers({
  auth: authRootReducer,
  polls: livepollRootReducer,
  myProfile: myProfileRootReducer,
});

export default rootReducer