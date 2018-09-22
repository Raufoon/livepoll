import {combineReducers} from 'redux'
import authRootReducer from "./reducers/auth/auth-root-reducer";
import livepollRootReducer from "./reducers/livepoll/livepoll-root-reducer";

const rootReducer = combineReducers({
  auth: authRootReducer,
  polls: livepollRootReducer,
});

export default rootReducer