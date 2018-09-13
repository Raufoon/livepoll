import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createLivepollStore from "./init/state-management";
import initFirebase from "./init/firebase";

// Initialization code
initFirebase();
const store = createLivepollStore();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root')
);

registerServiceWorker();
