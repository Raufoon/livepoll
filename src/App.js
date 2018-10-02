import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Switch, withRouter, Route, Link} from 'react-router-dom';
import CreateIcon from '@material-ui/icons/CreateSharp';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './App.css';
import SignUpPage from "./components/SignUpPage/SignUpPage";
import HomePage from "./components/HomePage/HomePage";
import LivepollPage from "./components/LivepollPage/LivepollPage";
import {actionSignoutRequest} from "./state-management/actions/auth-actions";
import AuthUserBadge from "./components/AuthUserBadge/AuthUserBadge";
import ModalOpenerButton from "./components/modal-openers/ModalOpenerButton/ModalOpenerButton";
import PollCreationForm from "./components/forms/PollCreationForm/PollCreationForm";
import ToastDisplayer from "./components/ToastDisplayer/ToastDisplayer";

class App extends Component {
  render() {
    if (!this.props.isLoggedIn) {
      return <SignUpPage />;
    }
    return (
      <React.Fragment>
        <AppBar position="static" color={'default'}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu"><MenuIcon /></IconButton>
            <Typography variant="title" color="inherit">
              <Link className={'app-title'} to={'/'}>Livepoll</Link>
            </Typography>
            <div style={{flexGrow: 0.3}}/>
            <ModalOpenerButton
              ModalComponent={PollCreationForm}
              OpenerIcon={CreateIcon}
              buttonProps={{color: 'default'}}>Create a poll</ModalOpenerButton>
            <div style={{flexGrow: 0.7}}/>
            <AuthUserBadge/>
            <Button onClick={() => this.props.dispatch(actionSignoutRequest())}>Sign out</Button>
          </Toolbar>
        </AppBar>

        <br/>

        <div className='app-content'>
          <Switch>
            <Route path={'/poll/:id'} component={LivepollPage}/>
            <Route component={HomePage}/>
          </Switch>
        </div>

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
