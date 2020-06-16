import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import firebase from 'firebase/app'

firebase.initializeApp({
  apiKey: "AIzaSyBQSHVAGfc3pCsx6VBM-I0sMiT0r17Z5Ek",
  authDomain: "lllivepolll.firebaseapp.com",
  databaseURL: "https://lllivepolll.firebaseio.com",
  projectId: "lllivepolll",
  storageBucket: "lllivepolll.appspot.com",
  messagingSenderId: "1045079837725"
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
