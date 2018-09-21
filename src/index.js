import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import getLivepollStore from "./init/state-management";
import initFirebase from "./init/firebase";
import initAuth from "./init/auth";

// Initialization code
initFirebase();
initAuth();

ReactDOM.render(
  <Provider store={getLivepollStore()}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);

registerServiceWorker();
