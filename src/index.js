import React from 'react';
import 'typeface-roboto'
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import getLivepollStore from "./init/state-management";
import initFirebase from "./init/firebase";
import initAuth from "./init/auth";
import {initStateManagerWorker} from "./init/state-manager-worker";

// Initialization code
const store = getLivepollStore();
initFirebase();
initAuth();
initStateManagerWorker();

const App = Loadable({
  loader: ()=>import('./App'),
  loading: ()=>'',
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
