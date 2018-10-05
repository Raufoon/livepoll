import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import {connect} from 'react-redux';
import {Switch, withRouter, Route, Link} from 'react-router-dom';
import CreateIcon from '@material-ui/icons/CreateSharp';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import './App.css';
import SignUpPage from "./components/SignUpPage/SignUpPage";
import HomePage from "./components/HomePage/HomePage";
import LivepollPage from "./components/LivepollPage/LivepollPage";
import {actionSignoutRequest} from "./state-management/actions/auth-actions";
import ModalOpenerButton from "./components/modal-openers/ModalOpenerButton/ModalOpenerButton";
import PollCreationForm from "./components/forms/PollCreationForm/PollCreationForm";
import ToastDisplayer from "./components/ToastDisplayer/ToastDisplayer";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import HomeNavigationPanel from "./components/HomePage/MobileNavigationPanel/MobileNavigationPanel";
import AppBarContents from "./components/AppBarContents/AppBarContents";

const styles = {
  flexGrow10: {flexGrow: 1},
  flexGrow3: {flexGrow: .3},
  flexGrow7: {flexGrow: .7},
  pollCreateButton: {color: 'primary'},
  pollCreateButtonFloating: {
    color: 'secondary',
    variant: 'extendedFab'
  }
};

class App extends Component {
  render() {
    if (!this.props.isLoggedIn) {
      return <SignUpPage />;
    }

    return (
      <React.Fragment>
        <AppBar position="fixed" color={'default'}>
          <AppBarContents/>
        </AppBar>
        <AppBar position="static" color={'default'} className={'hidden-app-bar'}><Toolbar/></AppBar>
        <MediaQuery orientation={'portrait'}><HomeNavigationPanel/></MediaQuery>
        <br/>
        <div className='app-content app-content-resp'>
          <Switch>
            <Route path={'/poll/:id'} component={LivepollPage}/>
            <Route path={'/me'} component={ProfilePage}/>
            <Route component={HomePage}/>
          </Switch>
        </div>

        <ModalOpenerButton
          className={'poll-create-float-btn'}
          ModalComponent={PollCreationForm}
          OpenerIcon={CreateIcon}
          openerComponentProps={styles.pollCreateButtonFloating}>
          Create a poll
        </ModalOpenerButton>

        <ToastDisplayer/>
        <br/><br/><br/><br/><br/>
      </React.Fragment>
    )
  }
}

const s2p = state => ({
  isLoggedIn: !!state.auth.currentUser,
});
export default withRouter(connect(s2p)(App));
