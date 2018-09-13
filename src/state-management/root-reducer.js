import {combineReducers} from 'redux'
import authRootReducer from "./reducers/auth/auth-root-reducer";

const rootReducer = combineReducers({
  auth: authRootReducer
});

export default rootReducer