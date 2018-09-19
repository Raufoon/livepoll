import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';

import './App.css';
import SignUpPage from "./components/SignUpPage/SignUpPage";
import HomePage from "./components/HomePage/HomePage";
import CreateProfileForm from "./components/forms/CreateProfileForm/CreateProfileForm";
import ClickModalOpener from "./components/modal-openers/ClickModalOpener/ClickModalOpener";

class App extends Component {
  render() {
    if (!this.props.isLoggedIn) {
      return <SignUpPage />;
    }
    return (
      <div>
        {
          !this.props.loggedInUserData.name
          && (
            <ClickModalOpener
              modalOptions={{hideCloseButton: true}}
              ModalComponent={CreateProfileForm}>
              Complete your profile
            </ClickModalOpener>
          )
        }
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/profile' component={_=>"profile"}/>
        </Switch>
      </div>
    )
  }
}

const s2p = state => ({
  isLoggedIn: !!state.auth.currentUser,
  loggedInUserData: state.auth.userData
});
export default connect(s2p)(App);
