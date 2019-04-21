import React from 'react';
import 'typeface-roboto'
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import getLivepollStore from "./services/state-management";
import initFirebase from "./services/firebase";
import initAuth from "./services/auth";
import {initStateManagerWorker} from "./services/state-manager-worker";
import LPLoader from "./components/loaders/LPLoader";

// Initialization code
const store = getLivepollStore();
initFirebase();
initAuth();
initStateManagerWorker();

const App = Loadable({
  loader: ()=>import('./App'),
  loading: LPLoader,
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);

registerServiceWorker();
