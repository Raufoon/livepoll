import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import {connect} from 'react-redux';
import {Switch, withRouter, Route} from 'react-router-dom';
import CreateIcon from '@material-ui/icons/CreateSharp';
import AppBar from '@material-ui/core/AppBar';
import Loadable from 'react-loadable';

import './App.css';
import SignUpPage from "./components/SignUpPage/SignUpPage";
import ModalOpenerButton from "./components/utils/modal-openers/ModalOpenerButton/ModalOpenerButton";
import AppBarContents from "./components/AppBarContents/AppBarContents";
import NetworkStatus from "./components/utils/NetworkStatus/NetworkStatus";
import ToastDisplayer from "./components/ToastDisplayer/ToastDisplayer";
import FullScreenLoader from "./components/loaders/FullScreenLoader";
import LPLoader from "./components/loaders/LPLoader";

const HomePage = Loadable({
  loader: ()=>import('./components/HomePage/HomePage'),
  loading: LPLoader,
});
const LivepollPage = Loadable({
  loader: ()=>import('./components/LivepollPage/LivepollPage'),
  loading: LPLoader,
});
const PollCreationForm = Loadable({
  loader: ()=>import('./components/forms/PollCreationForm/PollCreationForm'),
  loading: LPLoader,
});
const ProfilePage = Loadable({
  loader: ()=>import('./components/ProfilePage/ProfilePage'),
  loading: LPLoader,
});
const HomeNavigationPanel = Loadable({
  loader: ()=> import('./components/HomePage/MobileNavigationPanel/MobileNavigationPanel'),
  loading: LPLoader,
});
const TrendingPollList = Loadable({
  loader: ()=> import('./components/TrendingPollList/TrendingPollList'),
  loading: LPLoader,
});

const styles = {
  flexGrow10: {flexGrow: 1},
  flexGrow3: {flexGrow: .3},
  flexGrow7: {flexGrow: .7},
  pollCreateButton: {color: 'primary'},
  pollCreateButtonFloating: {
    color: 'secondary',
    variant: 'extendedFab',
    size: 'small'
  }
};

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
  loaderState: state.loader.fullScreenLoader
});
export default withRouter(connect(s2p)(App));