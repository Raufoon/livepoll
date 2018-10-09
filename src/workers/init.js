import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "./state-management/middlewares/logger-middleware";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./state-management/root-reducer";
let livepollStore;

export const createLivepollStore = () => {
  let middlewares = [thunkMiddleware];
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
  }
  return createStore(rootReducer, applyMiddleware.apply(this, middlewares));
};

export const getLivepollStore = () => livepollStore;

export const initAppState = () => {
  livepollStore = createLivepollStore();
};