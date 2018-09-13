import React, { Component } from 'react';
import {connect} from 'react-redux';

import './App.css';
import SignUpPage from "./components/SignUpPage/SignUpPage";
import HomePage from "./components/HomePage/HomePage";

class App extends Component {
  render() {
    if (!this.props.isLoggedIn) return <SignUpPage/>;
    return <HomePage/>
  }
}

const s2p = state => ({
  isLoggedIn: !!state.auth.currentUser
});
export default connect(s2p)(App);
