import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import getLivepollStore from "./init/state-management";
import initFirebase from "./init/firebase";
import initAuth from "./init/auth";

const App = Loadable({
  loader: ()=>import('./App'),
  loading: ()=>'',
});

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
