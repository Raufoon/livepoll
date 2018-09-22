import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Switch, withRouter, Route} from 'react-router-dom';

import './App.css';
import SignUpPage from "./components/SignUpPage/SignUpPage";
import HomePage from "./components/HomePage/HomePage";
import Appbar from "./components/Appbar/Appbar";
import LivepollPage from "./components/LivepollPage/LivepollPage";

class App extends Component {
  render() {
    if (!this.props.isLoggedIn) {
      return <SignUpPage />;
    }
    return (
      <React.Fragment>
        <Appbar/>
        <Switch>
          <Route path={'/poll/:id'} component={LivepollPage}/>
          <Route component={HomePage}/>
        </Switch>
      </React.Fragment>
    )
  }
}

const s2p = state => ({
  isLoggedIn: !!state.auth.currentUser,
});
export default withRouter(connect(s2p)(App));
