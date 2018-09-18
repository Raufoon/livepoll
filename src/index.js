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
  <BrowserRouter>
    <Provider store={getLivepollStore()}>
      <App/>
    </Provider>
  </BrowserRouter>
  , document.getElementById('root')
);

registerServiceWorker();
