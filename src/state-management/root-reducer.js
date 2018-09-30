import {combineReducers} from 'redux'
import authReducer from "./reducers/auth-reducer";
import livepollReducer from "./reducers/livepoll-reducer";
import myProfileReducer from "./reducers/my-profile-reducer";
import toastReducer from "./reducers/toast-reducer";
import homeReducer from "./reducers/home-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  polls: livepollReducer,
  myProfile: myProfileReducer,
  toast: toastReducer,
  homePage: homeReducer,
});

export default rootReducer