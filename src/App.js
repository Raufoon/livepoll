import React, { Component } from 'react';
import {connect} from 'react-redux';

import './App.css';
import SignUpPage from "./components/SignUpPage/SignUpPage";

class App extends Component {
  render() {
    if (!this.props.isLoggedIn) return <SignUpPage/>
    return <div>Not supposted to land here</div>
  }
}

const s2p = state => ({
  isLoggedIn: !!state.auth.signin.method
});
export default connect(s2p)(App);
