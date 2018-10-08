import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "./state-management/middlewares/logger-middleware";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./state-management/root-reducer";
import {setInitialState} from "./state-management/initial-state";
let livepollStore;

export const createLivepollStore = (appState) => {
  let middlewares = [thunkMiddleware];
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
  }
  setInitialState(appState);
  return createStore(rootReducer, applyMiddleware.apply(this, middlewares));
};

export const getLivepollStore = () => livepollStore;

export const initAppState = (appState) => {
  livepollStore = createLivepollStore(appState);
};