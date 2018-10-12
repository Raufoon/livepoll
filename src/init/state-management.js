import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk'

import rootReducer from "../state-management/root-reducer";
import loggerMiddleware from "../state-management/middlewares/logger-middleware";

const createLivepollStore = () => {
  let middlewares = [thunkMiddleware];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
  }
  return createStore(rootReducer, applyMiddleware.apply(this, middlewares));
};

const livepollStore = createLivepollStore();
const getLivepollStore = () => livepollStore;

export default getLivepollStore;