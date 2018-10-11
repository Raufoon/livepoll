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

window.addEventListener('beforeunload', () => {
  let stateToSave = getLivepollStore().getState();
  if (stateToSave.auth.currentUser) {
    stateToSave.loader.fullScreenLoader = {
      show: true,
      message: 'Loading'
    };
  }
  delete stateToSave.auth;
  localStorage.setItem('app-state', JSON.stringify(stateToSave))
});

export default getLivepollStore;