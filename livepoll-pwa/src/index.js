import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import firebase from 'firebase/app'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './state-management/root-reducer'
import {BrowserRouter} from 'react-router-dom'
import reduxThunk from 'redux-thunk'
import './index.css'

firebase.initializeApp({
  apiKey: "AIzaSyBQSHVAGfc3pCsx6VBM-I0sMiT0r17Z5Ek",
  authDomain: "lllivepolll.firebaseapp.com",
  databaseURL: "https://lllivepolll.firebaseio.com",
  projectId: "lllivepolll",
  storageBucket: "lllivepolll.appspot.com",
  messagingSenderId: "1045079837725"
})

const reduxLogger = store => next => action => {
  console.log(action)
  next(action)
  console.log('Updated State', store.getState())
}

const middleWaresForPro = [reduxThunk]
const middleWaresForDev = [...middleWaresForPro, reduxLogger]
const middleWares = process.env.NODE_ENV === 'production' ? middleWaresForPro: middleWaresForDev

const store = createStore(rootReducer, applyMiddleware(...middleWares))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// TODO: Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env.NODE_ENV === 'production') serviceWorker.register()
