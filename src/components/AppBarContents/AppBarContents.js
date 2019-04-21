import React from "react";
import {connect} from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom'
import {Link} from "react-router-dom";
import MediaQuery from "react-responsive";
import AuthUserBadge from "../AuthUserBadge/AuthUserBadge";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import { withStyles } from '@material-ui/core/styles';

import {actionSignoutRequest} from "../../services/state-management/actions/auth-actions";
import ImageButton from "../ImageButton";
import ModalOpenerButton from "../modal-openers/ModalOpenerButton/ModalOpenerButton";
import PollCreationForm from "../forms/PollCreationForm/PollCreationForm";

const styles = () => ({
  flexGrow10: {flexGrow: 1},
  flexGrow3: {flexGrow: .3},
  flexGrow7: {flexGrow: .7},
  signOutBtn: {
    color: '#de767f',
    fontSize: 'small'
  },
  activeLink: {
    color: 'crimson !important'
  },
  menuItem: {
    backgroundColor: 'inherit'
  },
  navlink: {
    color: '#4a4e69'
  }
});

const AppBarContents = props => {
  const doSignOut = () => props.dispatch(actionSignoutRequest());
  const {classes} = props;

  const createLink = (to, label) => (
    <ImageButton
      className={`${classes.navlink} ${classes.menuItem}`}
      activeClassName={classes.activeLink}
      text={label}
      to={to}
      ContainerComponent={NavLink}
    />
  );

  return (
    <Toolbar>
      <Link className={'app-title font-bold'} to={'/'}>Livepoll</Link>

      <div className={classes.flexGrow3}/>
      <MediaQuery minWidth={800}>
        {createLink('/trending', 'Trending')}
        {createLink('/popular', 'Popular')}
        {createLink('/recent', 'Recent')}
        <ModalOpenerButton
          className={`${classes.navlink} ${classes.menuItem}`}
          ModalComponent={PollCreationForm}>
          Create
        </ModalOpenerButton>
      </MediaQuery>

      <div className={classes.flexGrow7}/>

      <AuthUserBadge/>

      <MediaQuery minWidth={800}>
        &nbsp;&nbsp;
        <ImageButton text={'SIGN OUT'} onClick={doSignOut} className={classes.signOutBtn}/>
      </MediaQuery>
    </Toolbar>
  )
};

export default withRouter(
  connect()(
    withStyles(styles)(AppBarContents)
  )
)