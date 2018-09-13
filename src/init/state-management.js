import {createStore, applyMiddleware} from "redux";

import rootReducer from "../state-management/root-reducer";
import loggerMiddleware from "../state-management/middlewares/logger-middleware";

const createLivepollStore = () => {
  let middlewares = [];
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
  }
  return createStore(rootReducer, applyMiddleware.apply(this, middlewares));
};

export default createLivepollStore;