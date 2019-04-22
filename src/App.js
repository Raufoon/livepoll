import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {Switch, withRouter, Route} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Loadable from 'react-loadable';

import './App.css';
import SignUpPage from "./components/SignUpPage/SignUpPage";
import ModalOpenerButton from "./components/modal-openers/ModalOpenerButton/ModalOpenerButton";
import AppBarContents from "./components/AppBarContents/AppBarContents";
import NetworkStatus from "./components/NetworkStatus/NetworkStatus";
import ToastDisplayer from "./components/ToastDisplayer/ToastDisplayer";
import FullScreenLoader from "./components/loaders/FullScreenLoader";
import LPLoader from "./components/loaders/LPLoader";
import {APP_COLOR_GRADIENT} from "./constants/livepoll-constants";

const HomePage = Loadable({
  loader: ()=>import('./routes/HomePage'),
  loading: LPLoader,
});
const LivepollPage = Loadable({
  loader: ()=>import('./routes/Livepoll'),
  loading: LPLoader,
});
const PollCreationForm = Loadable({
  loader: ()=>import('./components/forms/PollCreationForm/PollCreationForm'),
  loading: LPLoader,
});
const ProfilePage = Loadable({
  loader: ()=>import('./routes/Profile'),
  loading: LPLoader,
});
const HomeNavigationPanel = Loadable({
  loader: ()=> import('./routes/HomePage/components/MobileNavigationPanel/MobileNavigationPanel'),
  loading: LPLoader,
});
const TrendingPollList = Loadable({
  loader: ()=> import('./routes/TrendingPollList'),
  loading: LPLoader,
});

const styles = () => ({
  pollCreateButton: {
    position: 'fixed',
    bottom: 5,
    right: 5,
    color: 'white',
    backgroundColor: '#163c39',
    border: '1px solid lightgray',
    borderRadius: 5,
  }
});

class App extends Component {
  render() {
    if (!this.props.isLoggedIn) {
      if (this.props.loaderState.show) {
        return <FullScreenLoader message={this.props.loaderState.message}/>;
      }
      return <SignUpPage />;
    }

    return (
      <React.Fragment>
        <AppBar position="static" color={'default'} className={'app-bar app-bar-resp'}>
          <AppBarContents/>
        </AppBar>

        <NetworkStatus/>

        {this.props.loaderState.show && <FullScreenLoader message={this.props.loaderState.message}/>}

        <MediaQuery maxWidth={799}><HomeNavigationPanel/></MediaQuery>

        <br/>
        <div className='app-content app-content-resp'>
          <Switch>
            <Route path={'/poll/:id'} component={LivepollPage}/>
            <Route path={'/me'} component={ProfilePage}/>
            <Route exact path={'/trending'} component={TrendingPollList}/>
            <Route exact path={'/popular'} component={TrendingPollList}/>
            <Route exact path={'/recent'} component={TrendingPollList}/>
            <Route component={HomePage}/>
          </Switch>
        </div>

        <MediaQuery maxWidth={799}>
          <ModalOpenerButton
            className={this.props.classes.pollCreateButton}
            ModalComponent={PollCreationForm}>
            Create
          </ModalOpenerButton>
        </MediaQuery>

        <ToastDisplayer/>
        <br/><br/><br/><br/><br/>
      </React.Fragment>
    )
  }
}

const s2p = state => ({
  isLoggedIn: !!state.auth.currentUser,
  loaderState: state.loader.fullScreenLoader
});
export default withRouter(
  connect(s2p)(
    withStyles(styles)(App)
  )
);